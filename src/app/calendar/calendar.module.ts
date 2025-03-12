import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CalendarComponent],
  providers: [DatePipe],
  exports: [CalendarComponent]
})
export class CalendarModule {}
