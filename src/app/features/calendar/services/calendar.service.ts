import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendar } from '@features/calendar/models/calendar.model';
import {environment} from '@environments/environment';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = `${environment.apiUrl}/v1/calendars`;

  constructor(private http: HttpClient,
              private keycloak: Keycloak) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloak.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCalendars(): Observable<Calendar[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Calendar[]>(this.apiUrl, {headers});
  }
}
