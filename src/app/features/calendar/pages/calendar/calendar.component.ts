import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: false,
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


  ngOnInit(): void {
  }

  popupVisible = false;

  openPopup(): void {
    this.popupVisible = true;
  }
}
