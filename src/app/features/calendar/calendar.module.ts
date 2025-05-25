import { NgModule, Optional, SkipSelf } from '@angular/core';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import {DailyViewComponent} from '@features/calendar/components/daily-view/daily-view.component';
import {EventPopupComponent} from '@features/calendar/components/event-popup/event-popup.component';
import {MiniCalendarComponent} from '@features/calendar/components/mini-calendar/mini-calendar.component';
import {MonthlyViewComponent} from '@features/calendar/components/monthly-view/monthly-view.component';
import {WeeklyViewComponent} from '@features/calendar/components/weekly-view/weekly-view.component';
import {CalendarComponent} from '@features/calendar/pages/calendar/calendar.component';
import {CoreModule} from '@core/core.module';
import {SidebarComponent} from '@features/calendar/components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';

@NgModule({
  declarations: [
    DailyViewComponent,
    EventPopupComponent,
    MiniCalendarComponent,
    MonthlyViewComponent,
    WeeklyViewComponent,
    CalendarComponent,
    SidebarComponent
  ],
  exports: [
    MiniCalendarComponent,
    EventPopupComponent
  ],
  imports: [
    NgForOf,
    MatFormField,
    FormsModule,
    MatIcon,
    MatInput,
    MatIconButton,
    NgIf,
    DatePipe,
    NgStyle,
    NgClass,
    AsyncPipe,
    CoreModule,
    RouterOutlet
  ]
})
export class CalendarModule {
  constructor(@Optional() @SkipSelf() parentModule: CalendarModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }
}
