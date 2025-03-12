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
  currentMonth!: string;
  currentYear!: number;
  startDay: number = 0;
  weekdays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  totalCells: any[] = [];

  constructor() {
    this.currentDate = new Date();
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
      if (i < this.startDay || i >= this.startDay + totalDays) {
        const prevMonth = subMonths(this.currentDate, 1);
        const prevMonthDays = getDaysInMonth(prevMonth);

        let day = null;
        if (i < this.startDay) {
          day = prevMonthDays - (this.startDay - i - 1);
        } else if (i >= this.startDay + totalDays) {
          day = i - (this.startDay + totalDays) + 1;
        }

        return { day, isOutsideMonth: true };
      } else {
        return { day: i - this.startDay + 1, isOutsideMonth: false };
      }
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
