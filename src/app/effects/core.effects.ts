import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError, of } from 'rxjs';
import { mergeMap, map, catchError, retryWhen } from 'rxjs/operators';
import { CoreService } from '../services/core.service';
import { SnackNotificationService } from '../services/snack-notification.service';
import { CoreActionTypes } from '../reducers/core/types';
import { EmailServer } from '../models/core';
import { emailSSuccess, emailSFail, emailCreateSuccess, emailCreateFail, emailEditSuccess, emailEditFail, emailDeleteSuccess, emailDeleteFail } from '../reducers/core/actions';
import { refreshRequest } from '../reducers/auth/actions';



@Injectable()
export class CoreEffects {

  emailSRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoreActionTypes.emailSRequest),
      mergeMap(() => this.coreService.getEmailsServer().pipe(
        map((emails: Array<EmailServer>) => emailSSuccess({ email_servers: emails })),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          () => {
            this.notification.showNotification('Error al obtener los servidores de email', 'error')
            return of(emailSFail());
          }
        )
      ))
    )
  );

  emailCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoreActionTypes.emailCreateRequest),
      mergeMap((payload: { email: EmailServer }) => this.coreService.createEmailServer(payload.email).pipe(
        map(() => emailCreateSuccess()),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          () => {
            this.notification.showNotification('Error al crear el servidor de email', 'error')
            return of(emailCreateFail());
          }
        )
      ))
    )
  );

  emailEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoreActionTypes.emailEditRequest),
      mergeMap((payload: { email: EmailServer }) => this.coreService.editEmailServer(payload.email).pipe(
        map(() => emailEditSuccess()),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          () => {
            this.notification.showNotification('Error al editar el servidor de email', 'error')
            return of(emailEditFail());
          }
        )
      ))
    )
  );

  emailDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoreActionTypes.emailDeleteRequest),
      mergeMap((payload: { id: number }) => this.coreService.deleteEmailServer(payload.id).pipe(
        map(() => emailDeleteSuccess()),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          () => {
            this.notification.showNotification('Error al borrar el servidor de email', 'error')
            return of(emailDeleteFail());
          }
        )
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private coreService: CoreService,
    private notification: SnackNotificationService,
  ) {}

}
