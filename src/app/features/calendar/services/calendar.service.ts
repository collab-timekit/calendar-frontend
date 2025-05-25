import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendar } from '@features/calendar/models/calendar.model';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly apiUrl = `${environment.apiUrl}/calendars`;

  constructor(private readonly http: HttpClient) {}

  getCalendars(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.apiUrl);
  }
}
