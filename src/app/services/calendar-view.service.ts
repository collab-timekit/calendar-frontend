import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarViewService {
  private viewModeSource = new BehaviorSubject<'daily' | 'weekly' | 'monthly'>('weekly');
  viewMode$ = this.viewModeSource.asObservable();

  setViewMode(mode: 'daily' | 'weekly' | 'monthly') {
    this.viewModeSource.next(mode);
  }
}
