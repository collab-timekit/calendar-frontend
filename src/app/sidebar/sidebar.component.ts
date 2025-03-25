import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MiniCalendarComponent} from '../mini-calendar/mini-calendar.component';
import {FormsModule} from '@angular/forms';

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
export class SidebarComponent {
  @Input() collapsed = false;

  calendars = [
    { id: 'work', name: 'Work Calendar', selected: true },
    { id: 'personal', name: 'Personal Calendar', selected: false },
    { id: 'meetings', name: 'Meetings', selected: true }
  ];
}
