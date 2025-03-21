import { Component } from '@angular/core';
import { getDaysInMonth, startOfMonth, getDay, subMonths, addMonths } from 'date-fns';
import {NgClass, NgForOf} from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  imports: [
    NgForOf,
    MatIcon,
    NgClass
  ],
  styleUrls: ['./mini-calendar.component.scss']
})
export class MiniCalendarComponent {
  currentDate: Date;
  currentDay: Date;
  currentMonth!: string;
  currentYear!: number;
  startDay: number = 0;
  weekdays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  totalCells: any[] = [];

  constructor() {
    this.currentDate = new Date();
    this.currentDay = new Date();
    this.updateCalendar();
  }

  updateCalendar() {
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    const totalDays = getDaysInMonth(this.currentDate);
    this.startDay = getDay(startOfMonth(this.currentDate));
    const totalCells = Array.from({ length: 42 }, (_, i) => i);

    this.totalCells = totalCells.map(i => {
      let day = null;
      let isOutsideMonth = false;
      let isCurrentDate = false;

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

      if (!isOutsideMonth && day === this.currentDay.getDate() && this.currentYear === this.currentDay.getFullYear() && this.currentMonth === this.currentDay.toLocaleString('default', { month: 'long' })) {
        isCurrentDate = true;
      }

      return { day, isOutsideMonth, isCurrentDate };
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
}
