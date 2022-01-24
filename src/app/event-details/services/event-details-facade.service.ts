import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EventDetailsService } from '.';
import {
  EventInfo,
  GuestList,
  LocationData,
  ReviewsList,
  SearchUser
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsFacadeService {
  private eventInfo$$ = new BehaviorSubject<EventInfo>(null);
  public eventInfo$ = this.eventInfo$$.asObservable();

  private guestList$$ = new BehaviorSubject<GuestList>(null);
  public guestList$ = this.guestList$$.asObservable();

  private locationData$$ = new BehaviorSubject<LocationData>(null);
  public locationData$ = this.locationData$$.asObservable();

  private reviewsList$$ = new BehaviorSubject<ReviewsList>(null);
  public reviewsList$ = this.reviewsList$$.asObservable();

  private users$$ = new BehaviorSubject<SearchUser[]>([]);
  public users$ = this.users$$.asObservable();

  constructor(private eventDetailsService: EventDetailsService) {}

  public loadEventInfo(eventId: number): void {
    this.eventDetailsService.getEventInfo(eventId).subscribe((eventInfo) => {
      this.eventInfo$$.next(eventInfo);
    });
  }

  public loadGuestList(): void {
    this.eventDetailsService.getGuestsList().subscribe((guestList) => {
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

  public loadSearchUsers(term: string): void {
    this.eventDetailsService.searchUsers(term).subscribe((users) => {
      this.users$$.next(users);
    });
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
