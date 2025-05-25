import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';
import {SearchFilter} from '@shared/models/search-filter.model';
import {Event, EventCreateRequest} from '@features/calendar/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly apiUrl = `${environment.apiUrl}/events`;

  constructor(private readonly http: HttpClient) {}

  getEventsForDay(day: Date): Observable<Event[]> {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const searchFilter: SearchFilter = {
      filters: [
        {
          field: 'startTime',
          operator: 'gt',
          value: startOfDay.toISOString(),
        },
        {
          field: 'startTime',
          operator: 'lt',
          value: endOfDay.toISOString(),
        }
      ]
    };

    return this.http.post<Event[]>(`${this.apiUrl}/search`, searchFilter);
  }

  getEventsForMonth(startDate: Date, endDate: Date): Observable<Event[]> {
    const searchFilter: SearchFilter = {
      filters: [
        {
          field: 'startTime',
          operator: 'gt',
          value: startDate.toISOString(),
        },
        {
          field: 'endTime',
          operator: 'lt',
          value: endDate.toISOString(),
        }
      ]
    };
    return this.http.post<Event[]>(`${this.apiUrl}/search`, searchFilter);
  }

  createEvent(event: EventCreateRequest): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }
}
