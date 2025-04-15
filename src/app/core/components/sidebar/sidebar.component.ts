import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MiniCalendarComponent } from '@features/calendar/components/mini-calendar/mini-calendar.component';
import { FormsModule } from '@angular/forms';
import { Calendar } from '@features/calendar/models/calendar.model';
import { CalendarService } from '@features/calendar/services/calendar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    NgIf,
    MatIcon,
    MiniCalendarComponent,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./sidebar.component.scss']
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
