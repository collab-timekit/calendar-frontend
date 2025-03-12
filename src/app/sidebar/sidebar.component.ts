import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MiniCalendarComponent} from '../mini-calendar/mini-calendar.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    NgIf,
    MatIcon,
    MiniCalendarComponent
  ],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
}
