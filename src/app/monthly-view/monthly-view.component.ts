import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import {EventService} from '../services/event.service';
import {Subscription} from 'rxjs';
import {CalendarViewService} from '../services/calendar-view.service';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  imports: [NgForOf, NgIf],
  styleUrls: ['./monthly-view.component.scss']
})
export class MonthlyViewComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  daysInMonth: Date[] = [];
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private subscription!: Subscription;

  constructor(
    private eventService: EventService,
    private calendarService: CalendarViewService
  ) {}

  ngOnInit(): void {
    this.updateMonthlyView();
    this.subscription = this.calendarService.selectedDate$.subscribe(date => {
      this.currentDate = date;
      this.updateMonthlyView();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateMonthlyView(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.daysInMonth = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstWeekday = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    for (let i = firstWeekday; i > 0; i--) {
      this.daysInMonth.push(new Date(year, month, 1 - i));
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }

    while (this.daysInMonth.length < 42) {
      this.daysInMonth.push(new Date(year, month + 1, this.daysInMonth.length - lastDayOfMonth.getDate() + 1));
    }
  }

  getEventsForDay(day: Date): any[] {
    return this.eventService.getEventsForDay(day);
  }
}
