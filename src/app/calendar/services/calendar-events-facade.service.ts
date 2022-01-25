import { Injectable } from "@angular/core";
import { EventInfo } from "@app/event-details/interfaces";
import { CalendarEvent } from "angular-calendar";
import { EventColor } from "calendar-utils";
import { BehaviorSubject, Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { CalendarEventsService } from ".";


@Injectable({
  providedIn: 'root'
})
export class CalendarEventsFacadeService {
  private events$$ = new BehaviorSubject<CalendarEvent[]>([]);
  public events$: Observable<CalendarEvent[]> = this.events$$.asObservable();

  constructor(
    private calendarEventsService: CalendarEventsService
  ) {}

  public loadEvents(): void {
    this.calendarEventsService.getEvents()
      .pipe(
        map((values: EventInfo[]) => {
          return values.map((value: EventInfo) => {
            return (
              {
                id: value.id,
                start: new Date(value.start_date),
                end: new Date(value.end_date),
                title: value.event_title,
              }
            ) as CalendarEvent;
          });
        }),
        take(1)
      )
      .subscribe((value: CalendarEvent[]) => {
        this.events$$.next(value);
      })
  }
}