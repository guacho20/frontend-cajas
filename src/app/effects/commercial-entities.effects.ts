import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, retryWhen, catchError, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { refreshRequest } from '../reducers/auth/actions';
import { SnackNotificationService } from '../services/snack-notification.service';


import { CommercialEntitiesService } from '../services/commercial-entities.service';
import { QueryParameters } from '../models/general';
import { EntitiesActionTypes } from '../reducers/commercial-entities/types';
import { CommercialList, Commercial, CreateCommercialBody, EditCommercialBody } from '../models/commercial-entities';
import {
  allCommercialsSuccess,
  allCommercialsFail,
  commercialSuccess,
  commercialFail,
  commercialDeleteSuccess,
  commercialDeleteFail,
  commercialCreateSuccess,
  commercialCreateFail,
  commercialEditSuccess,
  commercialEditFail
} from '../reducers/commercial-entities/actions';



@Injectable()
export class CommercialEntitiesEffects {

  /*
  *
  *  Get effects
  *
  */

  allCommercialsRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(EntitiesActionTypes.allCommercialsRequest),
      switchMap((payload: QueryParameters) => this.entitiesService.getAllCommercials(payload).pipe(
        map((all_commercials: CommercialList) => allCommercialsSuccess({ all_commercials: all_commercials })),
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
            this.notification.showNotification('Error al obtener los establecimientos', 'error')
            return of(allCommercialsFail());
          }
        )
      ))
    )
  );
  commercialRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(EntitiesActionTypes.commercialRequest),
      switchMap((payload: { id: number }) => this.entitiesService.getCommercial(payload.id).pipe(
        map((commercial: Commercial) => commercialSuccess({ commercial: commercial })),
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
            this.notification.showNotification('Error al obtener el establecimiento', 'error')
            return of(commercialFail());
          }
        )
      ))
    )
  );

  /*
  *
  *  create effects
  *
  */

  commercialCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(EntitiesActionTypes.commercialCreateRequest),
      switchMap((payload: { commercial: CreateCommercialBody }) => this.entitiesService.createCommercial(payload.commercial).pipe(
        map(() => commercialCreateSuccess()),
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
            this.notification.showNotification('Error al crear el establecimiento', 'error')
            return of(commercialCreateFail());
          }
        )
      ))
    )
  );

  /*
  *
  *  Edit effects
  *
  */

  commercialEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(EntitiesActionTypes.commercialEditRequest),
      switchMap((payload: { commercial: EditCommercialBody }) => this.entitiesService.editCommercial(payload.commercial).pipe(
        map(() => commercialEditSuccess()),
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
            this.notification.showNotification('Error al editar el establecimiento', 'error')
            return of(commercialEditFail());
          }
        )
      ))
    )
  );

  /*
  *
  *  Delete effects
  *
  */

  commercialDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(EntitiesActionTypes.commercialDeleteRequest),
      switchMap((payload: { id: number }) => this.entitiesService.deleteCommercial(payload.id).pipe(
        map(() => commercialDeleteSuccess()),
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
            this.notification.showNotification('Error al obtener las empresas', 'error')
            return of(commercialDeleteFail());
          }
        )
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private notification: SnackNotificationService,
    private entitiesService: CommercialEntitiesService
  ) {}

}
