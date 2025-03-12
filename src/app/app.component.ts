import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ]
})
export class AppComponent {
  title = 'calendar-frontend';
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
