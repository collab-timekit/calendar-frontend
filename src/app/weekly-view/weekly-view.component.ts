import { Component, Input, OnInit } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  imports: [DatePipe, NgForOf],
  styleUrls: ['./weekly-view.component.scss']
})
export class WeeklyViewComponent implements OnInit {
  @Input() currentDate!: Date;
  daysInWeek: Date[] = [];
  currentTimePosition: number = 0;
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  ngOnInit(): void {
    this.updateWeeklyView();
    this.updateCurrentTime();
    setInterval(() => {
      this.updateCurrentTime();
    }, 60000);
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
    const currentHour = new Date().getHours();
    this.currentTimePosition = (100 / 24) * currentHour;
  }
}
