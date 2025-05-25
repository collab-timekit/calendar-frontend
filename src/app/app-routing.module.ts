import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {canActivateAuthRole} from '@core/guards/auth.guard';
import {DailyViewComponent} from '@features/calendar/components/daily-view/daily-view.component';
import {WeeklyViewComponent} from '@features/calendar/components/weekly-view/weekly-view.component';
import {MonthlyViewComponent} from '@features/calendar/components/monthly-view/monthly-view.component';
import {CalendarComponent} from '@features/calendar/pages/calendar/calendar.component';

export const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [canActivateAuthRole],
    children: [
      { path: 'month', component: MonthlyViewComponent },
      { path: 'week', component: WeeklyViewComponent },
      { path: 'day', component: DailyViewComponent },
      { path: '', redirectTo: 'month', pathMatch: 'full' }, // **bez** canActivate tutaj!
    ],
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' }, // **bez** canActivate!
  { path: '**', redirectTo: '/calendar' }, // **bez** canActivate!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

