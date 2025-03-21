import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  imports: [
    NgStyle,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./event-popup.component.scss']
})
export class EventPopupComponent {
  @Input() visible = false;
  @Input() position = { top: 100, left: 100 };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ title: string; time: string }>();

  eventTitle = '';
  eventTime = '';
  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  constructor(private elementRef: ElementRef) {}

  closePopup() {
    this.close.emit();
  }

  saveEvent() {
    this.save.emit({ title: this.eventTitle, time: this.eventTime });
    this.closePopup();
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
