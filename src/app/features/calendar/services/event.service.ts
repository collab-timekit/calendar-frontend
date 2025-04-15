import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';
import {SearchFilter} from '@shared/models/search-filter.model';
import { Event } from '@features/calendar/models/event.model';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly apiUrl = `${environment.apiUrl}/events`;

  constructor(private readonly http: HttpClient,
              private readonly keycloak: Keycloak) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloak.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getEventsForDay(day: Date): Observable<Event[]> {
    const formattedDate = day.toISOString();
    const searchFilter: SearchFilter = {
      filters: [
        {
          field: 'startTime',
          operator: 'eq',
          value: formattedDate,
        }
        ]
    };
    const headers = this.getAuthHeaders();
    return this.http.post<Event[]>(`${this.apiUrl}/search`, searchFilter, { headers });
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
    const headers = this.getAuthHeaders();
    return this.http.post<Event[]>(`${this.apiUrl}/search`, searchFilter, { headers });
  }
}
