import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError, of } from 'rxjs';
import { mergeMap, map, catchError, retryWhen } from 'rxjs/operators';
import { SnackNotificationService } from '../services/snack-notification.service';

import { SettingsActionTypes } from '../reducers/settings/types';
import { Province, City, Bank, PaymentMethod, BusinessType, CashBox, Department, CityDto } from '../models/settings';
import { SettingsService } from '../services/settings.service';
import {
  provincesSuccess,
  provincesFail,
  provinceCreateSuccess,
  provinceCreateFail,
  provinceEditSuccess,
  provinceEditFail,
  provinceDeleteSuccess,
  provinceDeleteFail,
  citiesSuccess,
  citiesFail,
  banksSuccess,
  banksFail,
  payMethodsSuccess,
  payMethodsFail,
  businessTypesSuccess,
  businessTypesFail,
  cashboxesSuccess,
  cashboxesFail,
  departmentsSuccess,
  departmentsFail,
  cityCreateSuccess,
  cityCreateFail,
  cityEditSuccess,
  cityEditFail,
  cityDeleteSuccess,
  cityDeleteFail,
  bankCreateSuccess,
  bankCreateFail,
  bankEditSuccess,
  bankEditFail,
  bankDeleteSuccess,
  bankDeleteFail,
  payMethodDeleteSuccess,
  payMethodDeleteFail,
  businessDeleteSuccess,
  businessDeleteFail,
  cashboxDeleteSuccess,
  cashboxDeleteFail,
  departmentDeleteSuccess,
  departmentDeleteFail,
  payMethodCreateSuccess,
  payMethodCreateFail,
  businessCreateSuccess,
  businessCreateFail,
  cashboxCreateSuccess,
  cashboxCreateFail,
  departmentCreateSuccess,
  departmentCreateFail,
  payMethodEditSuccess,
  payMethodEditFail,
  businessEditSuccess,
  businessEditFail,
  cashboxEditSuccess,
  cashboxEditFail,
  departmentEditSuccess,
  departmentEditFail,
  citiesAllSuccess,
  citiesAllFail
} from '../reducers/settings/actions';
import { refreshRequest } from '../reducers/auth/actions';



@Injectable()
export class SettingsEffects {

  /*
  *
  *   Get All
  *
  */
  provicesRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.provincesRequest),
      mergeMap(() => this.settingsService.getProvinces().pipe(
        map((provinces: Array<Province>) => provincesSuccess({ provinces: provinces })),
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
            this.notification.showNotification('Error al obtener las provincias', 'error')
            return of(provincesFail());
          }
        )
      ))
    )
  );
  citiesRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.citiesRequest),
      mergeMap((payload: { province_id: number }) => this.settingsService.getCities(payload.province_id).pipe(
        map((cities: Array<City>) => citiesSuccess({ cities: cities })),
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
            this.notification.showNotification('Error al obtener las ciudades', 'error')
            return of(citiesFail());
          }
        )
      ))
    )
  );
  citiesAllRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.citiesAllRequest),
      mergeMap(() => this.settingsService.getAllCities().pipe(
        map((cities: Array<City>) => citiesAllSuccess({ cities: cities })),
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
            this.notification.showNotification('Error al obtener las ciudades', 'error')
            return of(citiesAllFail());
          }
        )
      ))
    )
  );
  banksRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.banksRequest),
      mergeMap(() => this.settingsService.getBanks().pipe(
        map((banks: Array<Bank>) => banksSuccess({ banks: banks })),
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
            this.notification.showNotification('Error al obtener los bancos', 'error')
            return of(banksFail());
          }
        )
      ))
    )
  );
  pmsRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.payMethodsRequest),
      mergeMap(() => this.settingsService.getPaymentMethods().pipe(
        map((pms: Array<PaymentMethod>) => payMethodsSuccess({ pms: pms })),
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
            this.notification.showNotification('Error al obtener los métodos de pago', 'error')
            return of(payMethodsFail());
          }
        )
      ))
    )
  );
  bsTypesRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.businessTypesRequest),
      mergeMap(() => this.settingsService.getBusinessTypes().pipe(
        map((bsTypes: Array<BusinessType>) => businessTypesSuccess({ business_types: bsTypes })),
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
            this.notification.showNotification('Error al obtener los tipos de negocio', 'error')
            return of(businessTypesFail());
          }
        )
      ))
    )
  );
  cashboxesRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.cashboxesRequest),
      mergeMap(() => this.settingsService.getCashboxes().pipe(
        map((cashboxes: Array<CashBox>) => cashboxesSuccess({ cashboxes: cashboxes })),
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
            this.notification.showNotification('Error al obtener las cajas', 'error')
            return of(cashboxesFail());
          }
        )
      ))
    )
  );
  departmentsRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.departmentsRequest),
      mergeMap(() => this.settingsService.getDepartments().pipe(
        map((departments: Array<Department>) => departmentsSuccess({ departments: departments })),
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
            this.notification.showNotification('Error al obtener los departamentos', 'error')
            return of(departmentsFail());
          }
        )
      ))
    )
  );

  /*
  *
  *   Create
  *
  */
  proviceCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.provinceCreateRequest),
      mergeMap((payload: { province: Province }) => this.settingsService.createProvince(payload.province).pipe(
        map(() => provinceCreateSuccess()),
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
            this.notification.showNotification('Error al crear la provincia', 'error')
            return of(provinceCreateFail());
          }
        )
      ))
    )
  );
  citiyCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.cityCreateRequest),
      mergeMap((payload: { city: CityDto }) => this.settingsService.createCity(payload.city).pipe(
        map(() => cityCreateSuccess()),
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
            this.notification.showNotification('Error al crear la ciudad', 'error')
            return of(cityCreateFail());
          }
        )
      ))
    )
  );
  bankCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.bankCreateRequest),
      mergeMap((payload: { bank: Bank }) => this.settingsService.createBank(payload.bank).pipe(
        map(() => bankCreateSuccess()),
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
            this.notification.showNotification('Error al al crear el banco', 'error')
            return of(bankCreateFail());
          }
        )
      ))
    )
  );
  pmCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.payMethodCreateRequest),
      mergeMap((payload: { pm: PaymentMethod }) => this.settingsService.createPaymentMethod(payload.pm).pipe(
        map(() => payMethodCreateSuccess()),
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
            this.notification.showNotification('Error al crear el método de pago', 'error')
            return of(payMethodCreateFail());
          }
        )
      ))
    )
  );
  bsTypeCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.businessTypeCreateRequest),
      mergeMap((payload: { business_type: BusinessType }) => this.settingsService.createBusinessType(payload.business_type).pipe(
        map(() => businessCreateSuccess()),
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
            this.notification.showNotification('Error al crear el tipo de negocio', 'error')
            return of(businessCreateFail());
          }
        )
      ))
    )
  );
  cashboxCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.cashboxCreateRequest),
      mergeMap((payload: { cashbox: CashBox }) => this.settingsService.createCashbox(payload.cashbox).pipe(
        map(() => cashboxCreateSuccess()),
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
            this.notification.showNotification('Error al crear la caja', 'error')
            return of(cashboxCreateFail());
          }
        )
      ))
    )
  );
  departmentCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.departmentCreateRequest),
      mergeMap((payload: { department: Department }) => this.settingsService.createDepartment(payload.department).pipe(
        map(() => departmentCreateSuccess()),
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
            this.notification.showNotification('Error al crear el departamento', 'error')
            return of(departmentCreateFail());
          }
        )
      ))
    )
  );

  /*
  *
  *   Edit
  *
  */
  proviceEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.provinceEditRequest),
      mergeMap((payload: { province: Province }) => this.settingsService.editProvince(payload.province).pipe(
        map(() => provinceEditSuccess()),
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
            this.notification.showNotification('Error al editar la provincia', 'error')
            return of(provinceEditFail());
          }
        )
      ))
    )
  );
  citiyEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.cityEditRequest),
      mergeMap((payload: { city: City }) => this.settingsService.editCity(payload.city).pipe(
        map(() => cityEditSuccess()),
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
            this.notification.showNotification('Error al editar la ciudad', 'error')
            return of(cityEditFail());
          }
        )
      ))
    )
  );
  bankEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.bankEditRequest),
      mergeMap((payload: { bank: Bank }) => this.settingsService.editBank(payload.bank).pipe(
        map(() => bankEditSuccess()),
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
            this.notification.showNotification('Error al editar el banco', 'error')
            return of(bankEditFail());
          }
        )
      ))
    )
  );
  pmEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.payMethodEditRequest),
      mergeMap((payload: { pm: PaymentMethod }) => this.settingsService.editPaymentMethod(payload.pm).pipe(
        map(() => payMethodEditSuccess()),
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
            this.notification.showNotification('Error al editar el método de pago', 'error')
            return of(payMethodEditFail());
          }
        )
      ))
    )
  );
  bsTypeEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.businessTypeEditRequest),
      mergeMap((payload: { business_type: BusinessType }) => this.settingsService.editBusinessType(payload.business_type).pipe(
        map(() => businessEditSuccess()),
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
            this.notification.showNotification('Error al editar el tipo de negocio', 'error')
            return of(businessEditFail());
          }
        )
      ))
    )
  );
  cashboxEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.cashboxEditRequest),
      mergeMap((payload: { cashbox: CashBox }) => this.settingsService.editCashbox(payload.cashbox).pipe(
        map(() => cashboxEditSuccess()),
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
            this.notification.showNotification('Error al editar la caja', 'error')
            return of(cashboxEditFail());
          }
        )
      ))
    )
  );
  departmentEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.departmentEditRequest),
      mergeMap((payload: { department: Department }) => this.settingsService.editDepartment(payload.department).pipe(
        map(() => departmentEditSuccess()),
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
            this.notification.showNotification('Error al editar el departamento', 'error')
            return of(departmentEditFail());
          }
        )
      ))
    )
  );

  /*
  *
  *   Delete
  *
  */
  proviceDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.provinceDeleteRequest),
      mergeMap((payload: { id: number }) => this.settingsService.deleteProvince(payload.id).pipe(
        map(() => provinceDeleteSuccess()),
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
            this.notification.showNotification('Error al borrar la provincia', 'error')
            return of(provinceDeleteFail());
          }
        )
      ))
    )
  );
  citiyDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.cityDeleteRequest),
      mergeMap((payload: { id: number }) => this.settingsService.deleteCity(payload.id).pipe(
        map(() => cityDeleteSuccess()),
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
            this.notification.showNotification('Error al borrar la ciudad', 'error')
            return of(cityDeleteFail());
          }
        )
      ))
    )
  );
  bankDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.bankDeleteRequest),
      mergeMap((payload: { id: number }) => this.settingsService.deleteBank(payload.id).pipe(
        map(() => bankDeleteSuccess()),
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
            this.notification.showNotification('Error al borrar el banco', 'error')
            return of(bankDeleteFail());
          }
        )
      ))
    )
  );
  pmDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.payMethodDeleteRequest),
      mergeMap((payload: { id: number }) => this.settingsService.deletePaymentMethod(payload.id).pipe(
        map(() => payMethodDeleteSuccess()),
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
            this.notification.showNotification('Error al borrar el método de pago', 'error')
            return of(payMethodDeleteFail());
          }
        )
      ))
    )
  );
  bstypeDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.businessTypeDeleteRequest),
      mergeMap((payload: { id: number }) => this.settingsService.deleteBusinessType(payload.id).pipe(
        map(() => businessDeleteSuccess()),
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
            this.notification.showNotification('Error al borrar el tipo de negocio', 'error')
            return of(businessDeleteFail());
          }
        )
      ))
    )
  );
  cashboxDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.cashboxDeleteRequest),
      mergeMap((payload: { id: number }) => this.settingsService.deleteCashbox(payload.id).pipe(
        map(() => cashboxDeleteSuccess()),
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
            this.notification.showNotification('Error al borrar la caja', 'error')
            return of(cashboxDeleteFail());
          }
        )
      ))
    )
  );
  departmentDeleteRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SettingsActionTypes.departmentDeleteRequest),
      mergeMap((payload: { id: number }) => this.settingsService.deleteDepartment(payload.id).pipe(
        map(() => departmentDeleteSuccess()),
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
            this.notification.showNotification('Error al borrar el departamento', 'error')
            return of(departmentDeleteFail());
          }
        )
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private notification: SnackNotificationService,
  ) {}

}
