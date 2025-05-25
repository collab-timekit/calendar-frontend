import { Component } from '@angular/core';
import { CalendarViewService } from '../../services/calendar-view.service';
import { getDaysInMonth, startOfMonth, getDay, subMonths, addMonths } from 'date-fns';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  standalone: false,
  styleUrls: ['./mini-calendar.component.scss']
})
export class MiniCalendarComponent {
  currentDate: Date;
  currentDay: Date;
  currentMonth!: string;
  currentYear!: number;
  startDay: number = 0;
  weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  totalCells: any[] = [];
  selectedDate!: Date;

  constructor(private readonly calendarService: CalendarViewService) {
    this.currentDate = new Date();
    this.currentDay = new Date();

    this.calendarService.selectedDate$.subscribe(date => {
      this.selectedDate = date;
      this.updateCalendar();
    });
  }

  updateCalendar() {
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    const totalDays = getDaysInMonth(this.currentDate);
    const rawStartDay = getDay(startOfMonth(this.currentDate));
    this.startDay = (rawStartDay + 6) % 7;
    const totalCells = Array.from({ length: 42 }, (_, i) => i);

    this.totalCells = totalCells.map(i => {
      let day = null;
      let isOutsideMonth = false;
      let isCurrentDate = false;
      let isSelectedDate = false;

      if (i < this.startDay || i >= this.startDay + totalDays) {
        const prevMonth = subMonths(this.currentDate, 1);
        const prevMonthDays = getDaysInMonth(prevMonth);

        if (i < this.startDay) {
          day = prevMonthDays - (this.startDay - i - 1);
          isOutsideMonth = true;
        } else if (i >= this.startDay + totalDays) {
          day = i - (this.startDay + totalDays) + 1;
          isOutsideMonth = true;
        }
      } else {
        day = i - this.startDay + 1;
      }

      const cellDate = new Date(this.currentYear, this.currentDate.getMonth(), day ?? 1);

      if (!isOutsideMonth && cellDate.toDateString() === this.currentDay.toDateString()) {
        isCurrentDate = true;
      }

      if (!isOutsideMonth && cellDate.toDateString() === this.selectedDate.toDateString()) {
        isSelectedDate = true;
      }

      return { day, isOutsideMonth, isCurrentDate, isSelectedDate, cellDate };
    });
  }

  prevMonth() {
    this.currentDate = subMonths(this.currentDate, 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentDate = addMonths(this.currentDate, 1);
    this.updateCalendar();
  }

  selectDate(cell: any) {
    if (!cell.isOutsideMonth) {
      this.calendarService.setSelectedDate(cell.cellDate);
    }
  }
}
