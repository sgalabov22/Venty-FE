import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  EventInfo,
  Guest,
  GuestUserAccount,
  UpdateEventData
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

  public searchUsers(
    term: string,
    eventId: number
  ): Observable<GuestUserAccount[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<GuestUserAccount[]>(
      `${environment.baseApiUrl}/events/${eventId}/users`
    );
  }

  public updateEvent(
    updatedEvent: UpdateEventData,
    eventId: number
  ): Observable<UpdateEventData> {
    return this.http.put<UpdateEventData>(
      `${environment.baseApiUrl}/events/${eventId}`,
      updatedEvent
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
