import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { EventService } from '@features/calendar/services/event.service';
import { CalendarService } from '@features/calendar/services/calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Attendee } from '@features/calendar/models/attendee.model';
import { Calendar } from '@features/calendar/models/calendar.model';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss'],
  standalone: false
})
export class EventPopupComponent implements OnInit {
  @Input() visible = false;
  @Input() position = { top: 100, left: 100 };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  calendars: Calendar[] = [];

  private _event: any = {
    calendarId: null,
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: []
  };

  @Input()
  set event(value: any) {
    this._event = {
      ...this._event,
      ...value,
      attendees: value?.attendees ?? []
    };
  }

  get event(): any {
    return this._event;
  }

  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  constructor(
    private readonly eventService: EventService,
    private readonly calendarService: CalendarService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.calendarService.getCalendars().subscribe({
      next: (data) => this.calendars = data,
      error: (err) => {
        console.error('Error loading calendars:', err);
        this.showSnackBar('Failed to load calendars.');
      }
    });
  }

  closePopup() {
    this.close.emit();
  }

  saveEvent() {
    const { calendarId, title, startTime, endTime } = this.event;

    if (!title || !startTime || !endTime || !calendarId) {
      this.showSnackBar('Please fill in required fields.');
      return;
    }

    this.event.attendees = this.event.attendees.filter((attendee: Attendee) => attendee.email?.trim() !== '');

    this.eventService.createEvent({
      ...this.event,
      startTime: this.toISOString(this.event.startTime),
      endTime: this.toISOString(this.event.endTime),
      attendees: this.event.attendees.map((attendee: Attendee) => ({
        email: attendee.email,
        optional: attendee.optional
      }))
    }).subscribe({
      next: () => {
        this.save.emit(this.event);
        this.closePopup();
        this.showSnackBar('Event saved successfully!');
      },
      error: (err) => {
        console.error('Error saving event:', err);
        this.showSnackBar('Failed to save event.');
      }
    });
  }

  addAttendee() {
    this.event.attendees.push({ email: '', optional: false });
  }

  removeAttendee(index: number) {
    this.event.attendees.splice(index, 1);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
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

  toISOString = (value: string): string => {
    const withSeconds = value.length === 16 ? `${value}:00` : value;
    return new Date(withSeconds).toISOString();
  };
}
