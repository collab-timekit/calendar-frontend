import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { CalendarViewService } from '../../services/calendar-view.service';
import { Subscription } from 'rxjs';
import { EventPopupComponent } from '@features/calendar/components/event-popup/event-popup.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  standalone: false,
  styleUrls: ['./weekly-view.component.scss']
})
export class WeeklyViewComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  daysInWeek: Date[] = [];
  currentTimePosition: number = 0;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  private subscription!: Subscription;
  hoveredDayContent: HTMLElement | null = null;
  popupVisible = false;
  popupPosition = { top: 0, left: 0 };

  newEventData: {
    calendarId?: number;
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    attendees?: string[];
  } = {};

  constructor(private readonly calendarService: CalendarViewService,
              private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.subscription = this.calendarService.selectedDate$.subscribe(date => {
      this.currentDate = date;
      this.updateWeeklyView();
    });

    this.updateWeeklyView();
    this.updateCurrentTime();
    setInterval(() => {
      this.updateCurrentTime();
    }, 60000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateWeeklyView(): void {
    const currentDayOfWeek = this.currentDate.getDay(); // 0 = niedziela, 1 = poniedziałek, ..., 6 = sobota
    const adjustedDay = (currentDayOfWeek + 6) % 7; // przekształca: niedziela=6, pon=0, wt=1, ..., sob=5

    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - adjustedDay);

    this.daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.daysInWeek.push(day);
    }
  }

  updateCurrentTime(): void {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    this.currentTimePosition = ((currentHour * 60 + currentMinutes) / (24 * 60)) * 100;
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return (
      today.getDate() === day.getDate() &&
      today.getMonth() === day.getMonth() &&
      today.getFullYear() === day.getFullYear()
    );
  }

  onDayClick(day: Date): void {
    this.calendarService.setSelectedDate(day);
  }

  onDayContentClick(event: MouseEvent, day: Date): void {
    const target = event.currentTarget as HTMLElement;
    const boundingRect = target.getBoundingClientRect();
    const offsetY = event.clientY - boundingRect.top;

    const totalHeight = boundingRect.height;
    const minutesInDay = 24 * 60;
    const clickedMinutes = Math.floor((offsetY / totalHeight) * minutesInDay);

    const hours = Math.floor(clickedMinutes / 60);
    const minutes = clickedMinutes % 60;

    const start = new Date(day);
    start.setHours(hours, minutes, 0, 0);

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

    this.popupPosition = { top: event.clientY, left: event.clientX };
    this.popupVisible = true;
  }

  formatLocalDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mi = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const newTarget = (event.target as HTMLElement).closest('.day-content') as HTMLElement;

    if (this.hoveredDayContent && this.hoveredDayContent !== newTarget) {
      this.hoveredDayContent.classList.remove('hovering');
      this.hoveredDayContent.style.setProperty('--hover-top', `-9999px`);
    }

    if (newTarget) {
      this.hoveredDayContent = newTarget;
      this.hoveredDayContent.classList.add('hovering');

      const boundingRect = newTarget.getBoundingClientRect();
      const offsetY = event.clientY - boundingRect.top;
      newTarget.style.setProperty('--hover-top', `${offsetY}px`);
    } else if (this.hoveredDayContent) {
      this.hoveredDayContent.classList.remove('hovering');
      this.hoveredDayContent.style.setProperty('--hover-top', `-9999px`);
      this.hoveredDayContent = null;
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.hoveredDayContent) {
      this.hoveredDayContent.style.setProperty('--hover-top', `-9999px`);
      this.hoveredDayContent = null;
    }
  }

  onEventSave(event: any): void {
    console.log('Saved event:', event);
    this.snackBar.open('Wydarzenie zapisane pomyślnie!', 'Zamknij', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'snackbar-success'
    });
  }
}
