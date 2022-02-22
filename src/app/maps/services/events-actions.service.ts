import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInfo } from '@app/event-details/interfaces';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { EventCreateData } from '..';

@Injectable({
  providedIn: 'root'
})
export class EventsActionService {
  constructor(private http: HttpClient) {}

  public createEvent(bodyParams: EventCreateData): Observable<EventInfo> {
    const url = environment.baseApiUrl + '/events/create';
    return this.http.post<EventInfo>(url, bodyParams);
  }
}
