import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('auth/login')) {
      const token = this.authService.getToken();
      const refreshToken = this.authService.getRefreshToken();
      const isRefresh = request.url.includes('auth/refresh');
      const setToken = isRefresh ? refreshToken : token;
      const reqClone = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${setToken}`)
      });
      return next.handle(reqClone);
    }
    return next.handle(request);
  }
}
