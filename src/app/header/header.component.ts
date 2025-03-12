import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    MatIcon,
    NgIf,
    NgOptimizedImage
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  dropdownOpen: boolean = false;

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setView(view: string) {
    console.log('View selected:', view);
    this.dropdownOpen = false;
  }
}
