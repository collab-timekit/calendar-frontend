import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormField, MatInput} from '@angular/material/input';
import {AppRoutingModule} from './app-routing.module';
import {KEYCLOAK_PROVIDERS} from './app.config';
import {CoreModule} from '@core/core.module';
import {CalendarModule} from '@features/calendar/calendar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgForOf,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatInput,
    CoreModule,
    AppRoutingModule,
    CalendarModule
  ],
  providers: [
    ...KEYCLOAK_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
