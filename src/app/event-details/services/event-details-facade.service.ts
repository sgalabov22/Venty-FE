import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EventDetailsService } from '.';
import {
  EventInfo,
  GuestList,
  InfoTextData,
  LocationData,
  ReviewsList
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsFacadeService {
  private eventInfo$$ = new BehaviorSubject<EventInfo>(null);
  public eventInfo$ = this.eventInfo$$.asObservable();

  private infoTextData$$ = new BehaviorSubject<InfoTextData>(null);
  public infoTextData$ = this.infoTextData$$.asObservable();

  private guestList$$ = new BehaviorSubject<GuestList>(null);
  public guestList$ = this.guestList$$.asObservable();

  private locationData$$ = new BehaviorSubject<LocationData>(null);
  public locationData$ = this.locationData$$.asObservable();

  private reviewsList$$ = new BehaviorSubject<ReviewsList>(null);
  public reviewsList$ = this.reviewsList$$.asObservable();

  constructor(private eventDetailsService: EventDetailsService) {}

  public loadEventInfo(): void {
    forkJoin([
      this.eventDetailsService.getEventInfo(),
      this.eventDetailsService.getInfoTextData()
    ]).subscribe(([eventInfo, infoTextData]) => {
      this.eventInfo$$.next(eventInfo);
      this.infoTextData$$.next(infoTextData);
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

  public clearData(): void {
    this.eventInfo$$.next(null);
    this.guestList$$.next(null);
    this.locationData$$.next(null);
    this.reviewsList$$.next(null);
    this.infoTextData$$.next(null);
  }
}
