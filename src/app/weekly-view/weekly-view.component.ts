import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { CalendarViewService } from '../services/calendar-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  imports: [DatePipe, NgForOf, NgStyle, NgIf],
  styleUrls: ['./weekly-view.component.scss']
})
export class WeeklyViewComponent implements OnInit {
  currentDate: Date = new Date();
  daysInWeek: Date[] = [];
  currentTimePosition: number = 0;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  private subscription!: Subscription;

  constructor(private calendarService: CalendarViewService) {}

  ngOnInit(): void {
    // Subskrybujemy zmiany wybranej daty
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
    const currentDayOfWeek = this.currentDate.getDay();
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - currentDayOfWeek);

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

    // Obliczamy dokładną pozycję w procentach, uwzględniając minuty
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

  isCurrentWeek(): boolean {
    return this.daysInWeek.some(day => this.isToday(day));
  }

  onDayClick(day: Date): void {
    this.calendarService.setSelectedDate(day);
  }
}
