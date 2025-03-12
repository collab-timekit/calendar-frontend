import { Routes } from '@angular/router';
import { canActivateAuthRole } from './core/auth.guard';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-calendar' }
  }
];
