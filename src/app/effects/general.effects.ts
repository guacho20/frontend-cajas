import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError, of } from 'rxjs';
import { mergeMap, map, retryWhen, catchError } from 'rxjs/operators';

import { refreshRequest } from '../reducers/auth/actions';
import { GeneralService } from '../services/general.service';
import { SnackNotificationService } from '../services/snack-notification.service';
import { GeneralActionTypes } from '../reducers/general/types';
import { State, Day } from '../models/general';
import { statesSuccess, statesFail, daysSuccess, daysFail } from '../reducers/general/actions';



@Injectable()
export class GeneralEffects {

  /*
  *
  *   Get All
  *
  */
  statesRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(GeneralActionTypes.statesRequest),
      mergeMap(() => this.generalService.getStates().pipe(
        map((states: Array<State>) => statesSuccess({ states: states })),
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
            this.notification.showNotification('Error al obtener los estados', 'error')
            return of(statesFail());
          }
        )
      ))
    )
  );
  daysRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(GeneralActionTypes.daysRequest),
      mergeMap(() => this.generalService.getDays().pipe(
        map((days: Array<Day>) => daysSuccess({ days: days })),
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
            this.notification.showNotification('Error al obtener los días', 'error')
            return of(daysFail());
          }
        )
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private generalService: GeneralService,
    private notification: SnackNotificationService,
  ) {}

}
