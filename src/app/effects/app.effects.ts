import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes } from '../reducers/auth/types';
import { SnackNotificationService } from '../services/snack-notification.service';
import { loginSuccess, loginFail, refreshSuccess, refreshFail, logout } from '../reducers/auth/actions';
import { Router } from '@angular/router';


@Injectable()
export class AppEffects {

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.loginRequest),
    mergeMap((payload) => this.authService.login(payload).pipe(
      map((token: { access_token: string, refresh_token: string }) => {
        return loginSuccess(token);
      }),
      catchError(
        (err) => {
          if (err.error.statusCode === 401) {
            this.notification.showNotification('Credenciales incorrectas', 'error')
          } else {
            this.notification.showNotification('Ha ocurrido un error en el servidor', 'error')
          }
          return of(loginFail());
        }
      )
    )),
  ));

  loginSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.loginSuccess),
    tap(() => this.router.navigate(['/dashboard']))
  ), { dispatch: false });

  logoutEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.logout),
    tap(() => this.router.navigate(['/']))
  ), { dispatch: false });

  refreshLoginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.refreshRequest),
    mergeMap((payload: { url?: string }) => this.authService.refreshLogin().pipe(
      map((token: { access_token: string, refresh_token: string }) => {
        if(payload.url) {
          this.router.navigate([payload.url]);
        }
        return refreshSuccess(token);
      }),
      catchError(
        (err) => {
          if (err.error.statusCode === 401) {
            this.notification.showNotification('Credenciales incorrectas', 'error')
          } else {
            this.notification.showNotification('Ha ocurrido un error en el servidor', 'error')
          }
          return of(refreshFail());
        }
      )
    )),
  ));

  refreshFailEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.refreshFail),
    map(() => logout())
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notification: SnackNotificationService,
    private router: Router
  ) {}

}
