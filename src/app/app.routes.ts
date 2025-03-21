import { Routes } from '@angular/router';
import { canActivateAuthRole } from './auth/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-calendar' }
  }
];
