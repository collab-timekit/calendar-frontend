import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '@core/components/header/header.component';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    MatIcon,
    RouterLink,
    RouterLinkActive,
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }
}
