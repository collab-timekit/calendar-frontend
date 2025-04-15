import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  imports: [NgStyle, NgIf, FormsModule, NgForOf, MatIcon],
  styleUrls: ['./event-popup.component.scss']
})
export class EventPopupComponent {
  @Input() visible = false;
  @Input() position = { top: 100, left: 100 };
  @Input() calendars: { id: number, name: string }[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  calendarId: number | null = null;
  eventTitle = '';
  eventDescription = '';
  eventStartTime = '';
  eventEndTime = '';
  eventLocation = '';
  attendees: string[] = [];

  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  closePopup() {
    this.close.emit();
  }

  saveEvent() {
    if (!this.eventTitle || !this.eventStartTime || !this.eventEndTime || !this.calendarId) {
      alert('Please fill in required fields.');
      return;
    }

    this.save.emit({
      calendarId: this.calendarId,
      title: this.eventTitle,
      description: this.eventDescription,
      startTime: this.eventStartTime,
      endTime: this.eventEndTime,
      location: this.eventLocation,
      attendees: this.attendees.filter(email => email.trim() !== '')
    });

    this.closePopup();
  }

  addAttendee() {
    this.attendees.push('');
  }

  removeAttendee(index: number) {
    this.attendees.splice(index, 1);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('popup-header')) {
      this.isDragging = true;
      this.offsetX = event.clientX - this.position.left;
      this.offsetY = event.clientY - this.position.top;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.position.left = event.clientX - this.offsetX;
      this.position.top = event.clientY - this.offsetY;
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }
}
