import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {CalendarViewService} from '../services/calendar-view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    MatIcon,
    NgIf
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  dropdownOpen: boolean = false;
  currentView: 'daily' | 'weekly' | 'monthly' = 'weekly';
  userName: string = 'John Doe';

  constructor(private calendarViewService: CalendarViewService) {}

  setView(view: 'daily' | 'weekly' | 'monthly') {
    this.currentView = view;
    this.dropdownOpen = false;
    this.calendarViewService.setViewMode(view);
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
