import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CalendarViewService } from '../../services/calendar-view.service';
import { Event } from '@features/calendar/models/event.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit {
  currentDate: Date = new Date();
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  events: Event[] = [];
  eventsByHour: { [hour: number]: Event[] } = {};

  constructor(
    private readonly eventService: EventService,
    private readonly calendarService: CalendarViewService
  ) {}

  ngOnInit(): void {
    this.calendarService.selectedDate$.subscribe(date => {
      this.currentDate = date;
      this.loadEvents();
    });
  }

  loadEvents(): void {
    this.eventService.getEventsForDay(this.currentDate).subscribe(events => {
      this.events = events;
      this.eventsByHour = this.organizeEventsByHour(events);
    });
  }

  organizeEventsByHour(events: Event[]): { [hour: number]: Event[] } {
    return events.reduce((acc, event) => {
      const hour = new Date(event.startTime).getHours();
      if (!acc[hour]) {
        acc[hour] = [];
      }
      acc[hour].push(event);
      return acc;
    }, {} as { [hour: number]: Event[] });
  }

  getFormattedDate(): string {
    return this.currentDate.toLocaleDateString();
  }
}
