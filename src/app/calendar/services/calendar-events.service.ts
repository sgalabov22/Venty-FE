import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInfo } from '@app/event-details/interfaces';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {
  constructor(private http: HttpClient) {}

  public getEvents(): Observable<EventInfo[]> {
    return this.http.get<EventInfo[]>(`${environment.baseApiUrl}/events`);
  }
}
