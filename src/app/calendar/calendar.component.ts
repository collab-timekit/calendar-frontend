import { Component, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';
import {MonthlyViewComponent} from '../monthly-view/monthly-view.component';
import {WeeklyViewComponent} from '../weekly-view/weekly-view.component';
import {DailyViewComponent} from '../daily-view/daily-view.component';
import {CalendarViewService} from '../services/calendar-view.service';

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
  viewMode: 'daily' | 'weekly' | 'monthly' = 'weekly';

  constructor(private calendarViewService: CalendarViewService) {}

  ngOnInit(): void {
    this.calendarViewService.viewMode$.subscribe(mode => {
      this.viewMode = mode;
    });
  }
}
