import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calendar } from '@features/calendar/models/calendar.model';
import { CalendarService } from '@features/calendar/services/calendar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  @Output() createEvent = new EventEmitter<void>();
  calendars: Calendar[] = [];

  constructor(private readonly calendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadCalendars();
  }

  loadCalendars(): void {
    this.calendarService.getCalendars().subscribe((calendars: Calendar[]) => {
      this.calendars = calendars;
    });
  }

  onCreateClick(): void {
    this.createEvent.emit();
  }
}
