import { Injectable } from '@angular/core';
import { MapsActionsService } from '@app/maps';
import { BehaviorSubject } from 'rxjs';
import { EventDetailsService } from '.';
import {
  EventInfo,
  Guest,
  GuestUserAccount,
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsFacadeService {
  private eventInfo$$ = new BehaviorSubject<EventInfo>(null);
  public eventInfo$ = this.eventInfo$$.asObservable();

  private guestList$$ = new BehaviorSubject<Guest[]>([]);
  public guestList$ = this.guestList$$.asObservable();

  // private locationData$$ = new BehaviorSubject<google.maps.places.PlaceResult>(null);
  public locationData$ = this.mapsActionsService.selectedPlaceDetails$;

  // private reviewsList$$ = new BehaviorSubject<google.maps.places.PlaceReview[]>([]);
  public reviewsList$ = this.mapsActionsService.selectedPlaceReviews$;

  private users$$ = new BehaviorSubject<GuestUserAccount[]>([]);
  public users$ = this.users$$.asObservable();

  constructor(
    private eventDetailsService: EventDetailsService,
    private mapsActionsService: MapsActionsService
  ) {}

  public loadEventInfo(eventId: number): void {
    this.eventDetailsService.getEventInfo(eventId).subscribe((eventInfo) => {
      this.eventInfo$$.next(eventInfo);
    });
  }

  public loadGuestList(eventId: number): void {
    this.eventDetailsService.getGuestsList(eventId).subscribe((guestList) => {
      this.guestList$$.next(guestList);
    });
  }

  public loadLocationData(): void {
    this.mapsActionsService.loadPlaceDetails();
    // this.eventDetailsService.getLocationData().subscribe((locationData) => {
    //   this.locationData$$.next(locationData);
    //   this.reviewsList$$.next(locationData.reviews);
    // });
  }

  public loadSearchUsers(term: string, eventId: number): void {
    this.eventDetailsService.searchUsers(term, eventId).subscribe((users) => {
      console.log(users);
      this.users$$.next(users);
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
    // this.locationData$$.next(null);
    // this.reviewsList$$.next(null);
    this.users$$.next(null);
  }
}
