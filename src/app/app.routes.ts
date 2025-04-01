import { Routes } from '@angular/router';
import { canActivateAuthRole } from '@core/guards/auth.guard';
import { CalendarComponent } from '@features/calendar/pages/calendar/calendar.component';

export const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    canActivate: [canActivateAuthRole],
    data: {  }
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [canActivateAuthRole],
    data: {  }
  }
];
