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
