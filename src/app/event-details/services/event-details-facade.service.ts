import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EventDetailsService } from '.';
import {
  EventInfo,
  Guest,
  GuestUserAccount,
  LocationData,
  ReviewsList,
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsFacadeService {
  private eventInfo$$ = new BehaviorSubject<EventInfo>(null);
  public eventInfo$ = this.eventInfo$$.asObservable();

  private guestList$$ = new BehaviorSubject<Guest[]>(null);
  public guestList$ = this.guestList$$.asObservable();

  private locationData$$ = new BehaviorSubject<LocationData>(null);
  public locationData$ = this.locationData$$.asObservable();

  private reviewsList$$ = new BehaviorSubject<ReviewsList>(null);
  public reviewsList$ = this.reviewsList$$.asObservable();

  private users$$ = new BehaviorSubject<GuestUserAccount[]>([]);
  public users$ = this.users$$.asObservable();

  constructor(private eventDetailsService: EventDetailsService) {}

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
    forkJoin([
      this.eventDetailsService.getLocationData(),
      this.eventDetailsService.getReviewsList()
    ]).subscribe(([locationData, reviewsList]) => {
      this.locationData$$.next(locationData);
      this.reviewsList$$.next(reviewsList);
    });
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
    })
  }

  public clearUsers(): void {
    this.users$$.next(null);
  }

  public clearData(): void {
    this.eventInfo$$.next(null);
    this.guestList$$.next(null);
    this.locationData$$.next(null);
    this.reviewsList$$.next(null);
    this.users$$.next(null);
  }
}
