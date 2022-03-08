import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CustomCalendarUtils } from '@app/calendar/calendar-utils';
import { CalendarEvent, CalendarUtils, CalendarView } from 'angular-calendar';
import { endOfWeek, isSameWeek, startOfWeek } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import dateFormat from 'dateformat';
import { CalendarEventsFacadeService } from '@app/calendar';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss'],
  providers: [
    {
      provide: CalendarUtils,
      useClass: CustomCalendarUtils
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarContainerComponent implements OnInit, OnDestroy {
  public view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  public locale = 'en';
  public viewDate = new Date();
  public display = false;
  public headerText = '';

  public popUpEvents: CalendarEvent[] = [];

  public events$: Observable<CalendarEvent[]> =
    this.calendarEventsFacade.events$;

  private darkThemeClass = 'dark-theme';
  private prevEvents: CalendarEvent[] = [];

  constructor(
    private router: Router,
    private calendarEventsFacade: CalendarEventsFacadeService,
    @Inject(DOCUMENT) private document
  ) {}

  public ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
    delay(2000);
    this.calendarEventsFacade.loadEvents();
  }

  public dayClicked(day: any): void {
    console.log(day);
  }

  public handleEvent(event: CalendarEvent): void {
    console.log(event);
    this.router.navigate(['/event-details/' + event.id]);
  }

  public handleMoreEvent(date: Date, events: CalendarEvent[]) {
    console.log(events);
    this.headerText = 'Events on ' + dateFormat(date, 'mmmm dS, yyyy');

    this.popUpEvents = events;
    this.display = true;
  }

  public checkIfPlaceholder(date: Date, event: CalendarEvent): boolean {
    if (startOfWeek(date).getDate() === date.getDate()) {
      return false;
    }

    return date > event.start;
  }

  public sortEvents(events: CalendarEvent[], date: Date): CalendarEvent[] {
    if (events.length === 0) {
      return events;
    }

    const firstPartEvents = events.slice(0, 2);
    const secondPartEvents = events.slice(2);
    const secondPartPrevEvents = this.prevEvents.slice(2);

    secondPartPrevEvents.forEach((prevEvent: CalendarEvent) => {
      if (firstPartEvents.includes(prevEvent)) {
        console.log(prevEvent);
        firstPartEvents.splice(firstPartEvents.indexOf(prevEvent), 1);
        secondPartEvents.push(prevEvent);
        firstPartEvents.push(secondPartEvents.splice(0, 1)[0]);
      }
    });

    events = firstPartEvents.concat(secondPartEvents);
    if (date.getDate() === 20) {
      console.log(events);
      console.log(firstPartEvents);
      console.log(secondPartEvents);
    }
    events = events
      .filter((value) => !!value)
      .sort((e1: CalendarEvent, e2: CalendarEvent) => {
        if (e1.start > e2.start) {
          return 1;
        } else if (e1.end < e2.end) {
          return -1;
        } else {
          return 0;
        }
      });
    this.prevEvents = events;
    return events;
  }

  public getCellBorderRadius(): string {
    return '0.75rem';
  }

  public calculateEventWidth(event: CalendarEvent, date: Date): string {
    const startDate = isSameWeek(event.start, event.end) ? event.start : date;
    const endDate = isSameWeek(date, event.end) ? event.end : endOfWeek(date);
    const timeInMilisec: number = endDate.getTime() - startDate.getTime();
    const daysBetweenDates: number = Math.ceil(
      timeInMilisec / (1000 * 60 * 60 * 24)
    );

    if (
      daysBetweenDates <= 1 &&
      event.start.getDay() != endOfWeek(startDate).getDay()
    ) {
      return (daysBetweenDates + 1) * 100 + '%';
    }

    return daysBetweenDates * 100 + '%';
  }

  public ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }
}
