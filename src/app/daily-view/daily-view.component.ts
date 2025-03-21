import { Component, Input, OnInit } from '@angular/core';
import {EventService} from '../services/event.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit {
  @Input() currentDate!: Date;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Po załadowaniu komponentu pobieramy wydarzenia dla dnia
    this.events = this.eventService.getEventsForDay(this.currentDate);
  }

  getFormattedDate(): string {
    return this.currentDate.toLocaleDateString();
  }

  getEventsForHour(hour: number): any[] {
    return this.events.filter(event => event.date.getHours() === hour);
  }
}
