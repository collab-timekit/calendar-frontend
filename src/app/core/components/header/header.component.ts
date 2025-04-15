import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CalendarViewService} from '@features/calendar/services/calendar-view.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    MatIcon
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() toggleSidebar = new EventEmitter<void>();
  dropdownOpen: boolean = false;
  currentView: 'daily' | 'weekly' | 'monthly' = 'weekly';
  userName!: string;

  constructor(
    private readonly calendarViewService: CalendarViewService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserData()?.username;
  }

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
