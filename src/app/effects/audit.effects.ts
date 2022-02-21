import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackNotificationService } from '../services/snack-notification.service';
import { mergeMap, map, retryWhen, catchError, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { refreshRequest } from '../reducers/auth/actions';
import { AuditService } from '../services/audit.service';
import { AuditActionTypes } from '../reducers/audit/types';
import { auditAccessFail, auditAccessSuccess } from '../reducers/audit/actions';
import { AuditAccess } from '../models/audit';
import { QueryParameters } from '../models/general';



@Injectable()
export class AuditEffects {

  auditAccessRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuditActionTypes.auditAccessRequest),
      switchMap((payload: QueryParameters) => this.auditService.getAuditAccess(payload).pipe(
        map((access: { total: number; items: Array<AuditAccess>}) => auditAccessSuccess({ access: access })),
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
            this.notification.showNotification('Error al obtener usuarios', 'error')
            return of(auditAccessFail());
          }
        )
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private notification: SnackNotificationService,
    private auditService: AuditService
  ) {}

}
