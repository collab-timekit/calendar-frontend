import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition, includeBearerTokenInterceptor,
  provideKeycloak
} from 'keycloak-angular';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'calendar',
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
  ]
};
