import { inject } from '@angular/core';
import { KeycloakService } from '../service/keycloak.service';
import { HttpInterceptorFn } from '@angular/common/http';


export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);
  const token = keycloakService.keycloak.token;

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
}
