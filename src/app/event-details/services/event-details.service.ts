import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import {
  EventInfo,
  Guest,
  GuestUserAccount,
  LocationData,
  ReviewsList
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

  public getGuestsList(eventId: number): Observable<Guest[]> {
    return this.http.get<Guest[]>(
      `${environment.baseApiUrl}/events/${eventId}/guests`
    );
  }

  public getLocationData(): Observable<LocationData> {
    return this.http.get<LocationData>('/assets/mocks/location-info.json');
  }

  public getReviewsList(): Observable<ReviewsList> {
    return this.http.get<ReviewsList>('/assets/mocks/reviews-list.json');
  }

  public searchUsers(
    term: string,
    eventId: number
  ): Observable<GuestUserAccount[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<GuestUserAccount[]>(
        `${environment.baseApiUrl}/events/${eventId}/users`
      )
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
      );
  }

  public addUser(userId: number, eventId: number): Observable<any> {
    const params = [
      {
        guest_user_account: userId
      }
    ];

    return this.http.post<any>(
      `${environment.baseApiUrl}/events/${eventId}/guests`,
      params
    );
  }
}
