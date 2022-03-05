import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ChecklistItem,
  EventInfo,
  ExtensionsData,
  Guest,
  GuestUserAccount,
  UpdateEventData,
  UpdateGuestStatus
} from '../interfaces';

import { environment } from '@env/environment';
import { CurrentUserData } from '@app/auth';

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

  public getAllExtensionsForEvent(eventId: number): Observable<ExtensionsData> {
    return this.http.get<ExtensionsData>(
      `${environment.baseApiUrl}/events/${eventId}/extensions`
    );
  }

  public getCatalogWithAllAvailableUsers(
    eventId: number,
    extensionId: number
  ): Observable<CurrentUserData[]> {
    return this.http.get<CurrentUserData[]>(
      `${environment.baseApiUrl}/events/${eventId}/extensions/${extensionId}/viewers?type=checklist`
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

  public updateGuestStatus(
    updatedGuestStatus: UpdateGuestStatus
  ): Observable<{ status: string }> {
    const { eventId, guestId, status } = updatedGuestStatus;

    return this.http.put<{ status: string }>(
      `${environment.baseApiUrl}/events/${eventId}/guests/${guestId}`,
      { status }
    );
  }

  public updateChecklistItem(
    eventId: number,
    extensionId: number,
    updatedChecklistItem: ChecklistItem
  ): Observable<ChecklistItem> {
    return this.http.put<ChecklistItem>(
      `${environment.baseApiUrl}/events/${eventId}/extensions/${extensionId}?type=checklist`,
      updatedChecklistItem
    );
  }

  public removeChecklistViewer(
    eventId: number,
    extensionId: number,
    viewerToRemove: CurrentUserData
  ): Observable<ChecklistItem> {
    return this.http.put<ChecklistItem>(
      `${environment.baseApiUrl}/events/${eventId}/extensions/${extensionId}/viewers?type=checklist`,
      viewerToRemove
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

  public addChecklist(
    eventId: number,
    checklistItem: ChecklistItem
  ): Observable<ChecklistItem> {
    return this.http.post<ChecklistItem>(
      `${environment.baseApiUrl}/events/${eventId}/extensions?type=checklist`,
      checklistItem
    );
  }

  public addViewerToChecklist(
    eventId: number,
    extensionId: number,
    viewerPayload: CurrentUserData
  ): Observable<ChecklistItem> {
    return this.http.post<ChecklistItem>(
      `${environment.baseApiUrl}/events/${eventId}/extensions/${extensionId}/viewers?type=checklist`,
      viewerPayload
    );
  }

  public deleteChecklistExtension(
    eventId: number,
    extensionId: number
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${environment.baseApiUrl}/events/${eventId}/extensions/${extensionId}?type=checklist`
    );
  }
}
