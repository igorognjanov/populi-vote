import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from './service/keycloak.service';
import { httpTokenInterceptor } from './interceptor/http-token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient(
                withInterceptors([httpTokenInterceptor])
              ),
              provideNativeDateAdapter(), {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }, provideAnimationsAsync(), provideAnimationsAsync()]
};
