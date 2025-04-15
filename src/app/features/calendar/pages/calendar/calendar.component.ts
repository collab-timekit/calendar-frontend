import { Component, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';
import {MonthlyViewComponent} from '../../components/monthly-view/monthly-view.component';
import {WeeklyViewComponent} from '../../components/weekly-view/weekly-view.component';
import {DailyViewComponent} from '../../components/daily-view/daily-view.component';
import {CalendarViewService} from '../../services/calendar-view.service';
import {HeaderComponent} from '@core/components/header/header.component';
import {SidebarComponent} from '@core/components/sidebar/sidebar.component';
import {EventPopupComponent} from '@features/calendar/components/event-popup/event-popup.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [
    MonthlyViewComponent,
    WeeklyViewComponent,
    DailyViewComponent,
    NgIf,
    HeaderComponent,
    SidebarComponent,
    EventPopupComponent
  ],
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  viewMode: 'daily' | 'weekly' | 'monthly' = 'weekly';
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor(private readonly calendarViewService: CalendarViewService) {}

  ngOnInit(): void {
    this.calendarViewService.viewMode$.subscribe(mode => {
      this.viewMode = mode;
    });
  }

  popupVisible = false;

  openPopup(): void {
    this.popupVisible = true;
  }
}
