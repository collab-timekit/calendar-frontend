import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CalendarViewService } from '../../services/calendar-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss'],
  standalone: false
})
export class DailyViewComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  allEvents: any[] = [];

  currentTimePosition: number = 0;

  popupVisible = false;
  popupPosition = { top: 0, left: 0 };
  newEventData: any = {};

  private calendarSub!: Subscription;

  constructor(
    private readonly eventService: EventService,
    private readonly calendarService: CalendarViewService
  ) {}

  ngOnInit(): void {
    this.calendarSub = this.calendarService.selectedDate$.subscribe(date => {
      this.currentDate = date;
      this.loadEvents();
    });

    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 60000);
  }

  ngOnDestroy(): void {
    this.calendarSub.unsubscribe();
  }

  loadEvents(): void {
    this.eventService.getEventsForDay(this.currentDate).subscribe(events => {
      this.allEvents = events;
    });
  }

  getFormattedDate(): string {
    return this.currentDate.toLocaleDateString();
  }

  updateCurrentTime(): void {
    if (!this.isToday(this.currentDate)) {
      this.currentTimePosition = -9999;
      return;
    }
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    this.currentTimePosition = (minutes / (24 * 60)) * 100;
  }

  isToday(date: Date): boolean {
    const now = new Date();
    return now.toDateString() === date.toDateString();
  }

  onDayGridClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const hourRow = target.closest('.hour-row') as HTMLElement;
    if (!hourRow) return;

    const hour = Number(hourRow.getAttribute('data-hour'));
    if (isNaN(hour)) return;

    const clickY = event.clientY;
    const boundingRect = hourRow.getBoundingClientRect();
    const relativeY = clickY - boundingRect.top;

    const minute = Math.floor((relativeY / boundingRect.height) * 60);

    const start = new Date(this.currentDate);
    start.setHours(hour, minute, 0, 0);

    const end = new Date(start);
    end.setMinutes(start.getMinutes() + 30);

    this.newEventData = {
      calendarId: 1,
      title: '',
      description: '',
      startTime: this.formatLocalDateTime(start),
      endTime: this.formatLocalDateTime(end),
      location: ''
    };

    this.popupVisible = true;
  }


  formatLocalDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onEventSave(event: any): void {
    console.log('Zapisany event:', event);
    this.popupVisible = false;
  }

  previousDay(): void {
    const prev = new Date(this.currentDate);
    prev.setDate(prev.getDate() - 1);
    this.calendarService.setSelectedDate(prev);
  }

  nextDay(): void {
    const next = new Date(this.currentDate);
    next.setDate(next.getDate() + 1);
    this.calendarService.setSelectedDate(next);
  }

  getEventTopPx(event: any): number {
    const start = new Date(event.startTime);
    return (start.getHours() * 60 + start.getMinutes()) * (1200 / (24 * 60));
  }

  getEventHeightPx(event: any): number {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return durationMinutes * (1200 / (24 * 60));
  }
}
