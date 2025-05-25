import {Attendee} from '@features/calendar/models/attendee.model';

export interface Event {
  id: number;
  calendarId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  organizerId: string;
  status: string;
  attendees: any[];
}

export interface EventCreateRequest {
  calendarId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  attendees?: Attendee[];
}
