import {
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
  provideKeycloak
} from 'keycloak-angular';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {routes} from './app-routing.module';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8081)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});

export const KEYCLOAK_PROVIDERS = [
  provideKeycloak({
    config: {
      url: 'http://localhost:8080',
      realm: 'collab-timekit',
      clientId: 'calendar-client',
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    }
  }),
  {
    provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    useValue: [urlCondition]
  },
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withInterceptors([includeBearerTokenInterceptor]))
];
