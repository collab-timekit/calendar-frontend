import {Component, OnDestroy, OnInit} from '@angular/core';
import { EventService } from '../services/event.service';
import { CalendarViewService } from '../services/calendar-view.service';
import { NgForOf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  events: any[] = [];
  private subscription!: Subscription;

  constructor(
    private eventService: EventService,
    private calendarService: CalendarViewService
  ) {}

  ngOnInit(): void {
    this.subscription = this.calendarService.selectedDate$.subscribe(date => {
      this.currentDate = date;
      this.loadEvents();
    });

    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadEvents(): void {
    this.events = this.eventService.getEventsForDay(this.currentDate);
  }

  getFormattedDate(): string {
    return this.currentDate.toLocaleDateString();
  }

  getEventsForHour(hour: number): any[] {
    return this.events.filter(event => event.date.getHours() === hour);
  }
}
