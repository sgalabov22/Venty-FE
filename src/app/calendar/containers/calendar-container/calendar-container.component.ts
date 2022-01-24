import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AuthFacadeService } from '@app/auth';
import { CustomCalendarUtils } from '@app/calendar/calendar-utils';
import { CalendarEvent, CalendarUtils, CalendarView } from 'angular-calendar';
import {
  addDays,
  addHours,
  endOfMonth,
  endOfWeek,
  isSameWeek,
  startOfDay,
  startOfWeek,
  subDays
} from 'date-fns';
import { Subject } from 'rxjs';
import dateFormat from 'dateformat';

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

  private colors: any = {
    default: '#8c6fec'
  };

  public events: CalendarEvent[] = [
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.default
    },
    {
      start: subDays(startOfDay(new Date()), 2),
      end: addDays(new Date(), 7),
      title: 'A draggable and resizable event asdsadsasad 2',
      color: this.colors.default
    },
    {
      start: subDays(startOfDay(new Date()), 1),
      end: new Date(),
      title: 'A draggable and resizable event asdsadsasad',
      color: this.colors.default
    },
    {
      start: addDays(new Date(), 1),
      end: addDays(new Date(), 4),
      title: 'An event 1',
      color: this.colors.default
    },
    {
      start: new Date(),
      end: addDays(addHours(new Date(), 1), 2),
      title: 'An event 2',
      color: this.colors.default
    },
    {
      start: addDays(new Date(), 5),
      end: addDays(new Date(), 8),
      title: 'An event 3',
      color: this.colors.default
    }
  ];

  private darkThemeClass = 'dark-theme';
  private unsubscribe$ = new Subject<void>();
  private prevEvents: CalendarEvent[] = [];

  constructor(
    private authFacade: AuthFacadeService,
    @Inject(DOCUMENT) private document
  ) {}

  public ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);

    this.authFacade.loadCurrentUser();

    this.events.sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      }
      if (a.start > b.start) {
        return 1;
      }
      return 0;
    });

    this.events.forEach((event: CalendarEvent) => {
      event.start.setHours(0, 0, 0, 0);
      event.end.setHours(0, 0, 0, 0);
    });
  }

  public dayClicked(day: any): void {
    console.log(day);
  }

  public handleEvent(event: CalendarEvent): void {
    console.log(event);
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
        firstPartEvents.splice(firstPartEvents.indexOf(prevEvent), 1);
        secondPartEvents.push(prevEvent);
        firstPartEvents.push(secondPartEvents.splice(0, 1)[0]);
      }
    });

    events = firstPartEvents.concat(secondPartEvents);
    events = events.filter((value) => !!value);
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
      daysBetweenDates === 1 &&
      event.start.getDay() != endOfWeek(startDate).getDay()
    ) {
      return (daysBetweenDates + 1) * 100 + '%';
    }

    return daysBetweenDates * 100 + '%';
  }

  public ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
