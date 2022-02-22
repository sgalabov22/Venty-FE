import { Injectable } from '@angular/core';
import { MapsActionsService } from '@app/maps';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventDetailsService } from '.';
import {
  EventInfo,
  Guest,
  GuestUserAccount,
  UpdateEventData,
  UpdateGuestStatus
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsFacadeService {
  private eventInfo$$ = new BehaviorSubject<EventInfo>(null);
  public eventInfo$ = this.eventInfo$$.asObservable();

  private guestList$$ = new BehaviorSubject<Guest[]>([]);
  public guestList$ = this.guestList$$.asObservable();

  public locationData$ = this.mapsActionsService.selectedPlaceDetails$;
  public reviewsList$ = this.mapsActionsService.selectedPlaceReviews$;

  private users$$ = new BehaviorSubject<GuestUserAccount[]>([]);
  public users$ = this.users$$.asObservable();

  constructor(
    private eventDetailsService: EventDetailsService,
    private mapsActionsService: MapsActionsService,
    private messageService: MessageService
  ) {}

  public loadEventInfo(eventId: number): void {
    this.eventDetailsService.getEventInfo(eventId).subscribe((eventInfo) => {
      this.eventInfo$$.next(eventInfo);
      console.log(eventInfo);
      this.loadGuestList(eventId);
      this.loadLocationData(eventInfo.location);
    });
  }

  public loadGuestList(eventId: number): void {
    this.eventDetailsService.getGuestsList(eventId).subscribe((guestList) => {
      this.guestList$$.next(guestList);
    });
  }

  public loadLocationData(placeId: string): void {
    this.mapsActionsService.loadPlaceDetails(placeId);
  }

  public loadSearchUsers(term: string, eventId: number): void {
    this.eventDetailsService
      .searchUsers(term, eventId)
      .pipe(
        switchMap((users) =>
          of(
            users.filter((u) => {
              if (u.fullname) {
                return u.fullname.toLowerCase().startsWith(term.toLowerCase());
              }
            })
          )
        )
      )
      .subscribe((users) => {
        this.users$$.next(users);
      });
  }

  public updateEventData(updatedData: UpdateEventData, eventId: number): void {
    this.eventDetailsService
      .updateEvent(updatedData, eventId)
      .subscribe((updatedData: UpdateEventData) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Event description has been successfully updated!'
        });

        this.eventInfo$$.next({
          id: this.eventInfo$$.value.id,
          location: this.eventInfo$$.value.location,
          event_owner: this.eventInfo$$.value.event_owner,
          ...updatedData
        });
      });
  }

  public updateGuestStatus(updatedGuestStatus: UpdateGuestStatus): void {
    this.eventDetailsService
      .updateGuestStatus(updatedGuestStatus)
      .subscribe(({ status }) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: `Guest status has been updated to ${status}`
        });
      });
  }

  public addUser(userId: number, eventId: number): void {
    this.eventDetailsService.addUser(userId, eventId).subscribe((value) => {
      this.loadGuestList(eventId);
    });
  }

  public clearUsers(): void {
    this.users$$.next(null);
  }

  public clearData(): void {
    this.eventInfo$$.next(null);
    this.guestList$$.next(null);
    this.users$$.next(null);
  }
}
