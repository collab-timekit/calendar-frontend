import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  imports: [NgForOf],
  styleUrls: ['./monthly-view.component.scss']
})
export class MonthlyViewComponent implements OnInit {
  @Input() currentDate!: Date;
  daysInMonth: Date[] = [];
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  ngOnInit(): void {
    this.updateMonthlyView();
  }

  updateMonthlyView(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.daysInMonth = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Ile pustych komórek na początku?
    const firstWeekday = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    for (let i = firstWeekday; i > 0; i--) {
      this.daysInMonth.push(new Date(year, month, 1 - i));
    }

    // Faktyczne dni miesiąca
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }

    while (this.daysInMonth.length < 42) {
      this.daysInMonth.push(new Date(year, month + 1, this.daysInMonth.length - lastDayOfMonth.getDate() + 1));
    }
  }

  getFormattedMonth(): string {
    return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
