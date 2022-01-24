import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  EventInfo,
  GuestList,
  LocationData,
  ReviewsList,
  SearchUser
} from '../interfaces';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {
  constructor(private http: HttpClient) {}

  public getEventInfo(eventId: number): Observable<EventInfo> {
    return this.http.get<EventInfo>(
      `${environment.baseApiUrl}/events/${eventId}`
    );
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

  public searchUsers(term: string): Observable<SearchUser[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<SearchUser[]>('/assets/mocks/users.json')
      .pipe(
        switchMap((users) =>
          of(
            users.filter((u) =>
              u.fullName.toLowerCase().startsWith(term.toLowerCase())
            )
          )
        )
      );
  }
}
