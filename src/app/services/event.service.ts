import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: any[] = [
    { date: new Date(2025, 2, 5, 10, 0), name: 'Meeting with Bob' },
    { date: new Date(2025, 2, 5, 12, 30), name: 'Team Lunch' },
    { date: new Date(2025, 2, 5, 14, 0), name: 'Conference Call' },
    { date: new Date(2025, 2, 5, 16, 0), name: 'Client Presentation' },
    { date: new Date(2025, 2, 5, 9, 0), name: 'Workshop on Angular' },
    { date: new Date(2025, 2, 7, 11, 0), name: 'Marketing Strategy Meeting' },
    { date: new Date(2025, 2, 20, 9, 0), name: 'Workshop on Angular' },
  ];

  getEventsForDay(day: Date): any[] {
    return this.events.filter(event =>
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear() // Upewniamy się, że porównujemy także rok
    );
  }
}
