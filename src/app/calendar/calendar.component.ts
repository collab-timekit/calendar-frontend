import { Component, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';
import {MonthlyViewComponent} from '../monthly-view/monthly-view.component';
import {WeeklyViewComponent} from '../weekly-view/weekly-view.component';
import {DailyViewComponent} from '../daily-view/daily-view.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [
    MonthlyViewComponent,
    WeeklyViewComponent,
    DailyViewComponent,
    NgIf
  ],
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  viewMode: 'daily' | 'weekly' | 'monthly' = 'monthly';

  constructor() {}

  ngOnInit(): void {}

  changeViewMode(mode: 'daily' | 'weekly' | 'monthly'): void {
    this.viewMode = mode;
  }

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
  }

  goToToday(): void {
    this.currentDate = new Date();
  }
}
