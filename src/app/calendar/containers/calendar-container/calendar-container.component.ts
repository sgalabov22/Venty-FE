import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '@app/auth';
import { CustomCalendarUtils } from '@app/calendar/calendar-utils';
import { CalendarEvent, CalendarUtils, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfMonth, previousDay, startOfDay, subDays, subWeeks } from 'date-fns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss'],
  providers: [
    {
      provide: CalendarUtils,
      useClass: CustomCalendarUtils,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarContainerComponent implements OnInit, OnDestroy {
  public view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  public locale: string = 'en';
  public viewDate = new Date();

  private colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  public events: CalendarEvent[] = [
    {
      start: addHours(previousDay(new Date(), 6), 4),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: this.colors.red,
    },
    {
      start: addHours(new Date(), 1),
      title: 'An event with no end date',
      color: this.colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.blue,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: this.colors.yellow,
    },
    { start: new Date(), title: 'An event' },
    { start: new Date(), title: 'An event' },
    { start: new Date(), title: 'An event' },
    { start: addDays(startOfDay(new Date()), 1), title: 'different date' },
    { start: addDays(startOfDay(new Date()), 1), title: 'different date' },
  ];

  private darkThemeClass = 'dark-theme';
  private unsubscribe$ = new Subject<void>();

  constructor (
    private authFacade: AuthFacadeService,
    @Inject(DOCUMENT) private document
  ) {}

  public dayClicked(day): void {
    console.log(day);
  }

  public handleEvent(event: CalendarEvent): void {
    console.log(event);
    //this.openAppointmentList(date)
  }

  public handleMoreEvent(e: any , events: CalendarEvent[]) {
    console.log(events);
 }

  public ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }

  public ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
