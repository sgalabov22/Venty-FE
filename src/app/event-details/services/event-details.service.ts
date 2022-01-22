import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class EventDetailsService {
  constructor(private http: HttpClient) {}

  public getEventInfo(): Observable<EventInfo> {
    return this.http.get<EventInfo>('/assets/mocks/event-info.json');
  }

  public getGuestsList(): Observable<GuestList> {
    return this.http.get<GuestList>('/assets/mocks/guests-list.json');
  }

  public getLocationData(): Observable<LocationData> {
    return this.http.get<LocationData>('/assets/mocks/location-info.json');
  }

  public getReviewsList(): Observable<ReviewsList> {
    return this.http.get<ReviewsList>('/assets/mocks/reviews-list.json');
  }

  public getInfoTextData(): Observable<InfoTextData> {
    return this.http.get<InfoTextData>('/assets/mocks/info-text.json');
  }
}
