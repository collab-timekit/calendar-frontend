import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CalendarViewService } from '../../services/calendar-view.service';
import { BehaviorSubject } from 'rxjs';
import { Event } from '@features/calendar/models/event.model';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { getDay, getDaysInMonth, startOfMonth, subMonths } from 'date-fns';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  standalone: false,
  styleUrls: ['./monthly-view.component.scss']
})
export class MonthlyViewComponent implements OnInit {
  selectedDate: Date = new Date();
  today: Date = new Date();
  totalCells: any[] = [];
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  events$: { [key: string]: BehaviorSubject<Event[]> } = {};

  constructor(private readonly eventService: EventService,
              private readonly calendarService: CalendarViewService) {}

  ngOnInit(): void {
    this.calendarService.selectedDate$.subscribe(date => {
      this.selectedDate = date;
      this.generateCalendar();
      this.loadEventsForMonth();
    });
  }

  loadEventsForMonth(): void {
    this.events$ = {}; // wyczyść stare eventy przed załadowaniem

    const startOfMonthDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
    const endOfMonthDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0, 23, 59, 59, 999);

    this.eventService.getEventsForMonth(startOfMonthDate, endOfMonthDate).subscribe(events => {
      events.forEach(event => {
        const dateKey = new Date(event.startTime).toISOString().slice(0, 10);

        if (!this.events$[dateKey]) {
          this.events$[dateKey] = new BehaviorSubject<Event[]>([]);
        }

        this.events$[dateKey].next([...this.events$[dateKey].getValue(), event]);
      });
    });
  }

  generateCalendar() {
    const totalDays = getDaysInMonth(this.selectedDate);
    const rawStartDay = getDay(startOfMonth(this.selectedDate));
    const startDay = (rawStartDay + 6) % 7;  // przesunięcie: poniedziałek=0
    const totalCells = Array.from({ length: 42 }, (_, i) => i);
    const selectedYear = this.selectedDate.getFullYear();
    const selectedMonth = this.selectedDate.getMonth();
    const selectedDay = new Date(selectedYear, selectedMonth, this.selectedDate.getDate());

    this.totalCells = totalCells.map(i => {
      let day = null;
      let isOutsideMonth = false;
      let isCurrentDate = false;
      let isSelectedDate = false;

      if (i < startDay || i >= startDay + totalDays) {
        const prevMonth = subMonths(this.selectedDate, 1);
        const prevMonthDays = getDaysInMonth(prevMonth);

        if (i < startDay) {
          day = prevMonthDays - (startDay - i - 1);
          isOutsideMonth = true;
        } else if (i >= startDay + totalDays) {
          day = i - (startDay + totalDays) + 1;
          isOutsideMonth = true;
        }
      } else {
        day = i - startDay + 1;
      }

      const cellDate = new Date(selectedYear, selectedMonth, day ?? 1);

      if (!isOutsideMonth && cellDate.toDateString() === selectedDay.toDateString()) {
        isSelectedDate = true;
      }

      if (!isOutsideMonth && cellDate.toDateString() === this.today.toDateString()) {
        isCurrentDate = true;
      }

      return { day, isOutsideMonth, isCurrentDate, isSelectedDate, cellDate };
    });
  }

  trackByCell(index: number, cell: any): string {
    return cell.cellDate.toISOString();
  }
}
