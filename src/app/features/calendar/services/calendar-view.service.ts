import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarViewService {
  private readonly viewModeSource = new BehaviorSubject<'daily' | 'weekly' | 'monthly'>('weekly');
  viewMode$ = this.viewModeSource.asObservable();

  private readonly selectedDateSource = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSource.asObservable();

  setViewMode(mode: 'daily' | 'weekly' | 'monthly') {
    this.viewModeSource.next(mode);
  }

  setSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
  }
}
