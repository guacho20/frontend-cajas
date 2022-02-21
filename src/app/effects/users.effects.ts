import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActionTypes } from '../reducers/users/types';
import { map, mergeMap, catchError, retryWhen, filter } from 'rxjs/operators';
import {
  usersSuccess,
  usersFail,
  pwRulesSuccess,
  profilesSuccess,
  userSuccess,
  userEditSuccess,
  userEditFail,
  userFail,
  profilesFail,
  pwRulesFail,
  userEditPasswordSuccess,
  userEditPasswordFail,
  userEditDeactivateSuccess,
  userEditDeactivateFail,
  userEditActivateSuccess,
  userEditActivateFail,
  userEditProfileSuccess,
  userEditProfileFail,
  userCreateSuccess,
  userCreateFail
} from '../reducers/users/actions';
import { UsersService } from '../services/users.service';
import { SnackNotificationService } from '../services/snack-notification.service';
import { refreshRequest } from '../reducers/auth/actions';
import { of, throwError } from 'rxjs';
import { UserList, PasswordRules, Profiles, UserModel, UserCreate } from '../models/users';



@Injectable()
export class UsersEffects {

  // Get All

  usersRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.usersRequest),
      mergeMap(() => this.usersService.getUsers().pipe(
        map((users: Array<UserList>) => usersSuccess({ users: users })),
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
            return of(usersFail());
          }
        )
      ))
    )
  );

  pwRulesRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.pwRulesRequest),
      mergeMap(() => this.usersService.getRules().pipe(
        map((rules: Array<PasswordRules>) => pwRulesSuccess({ rules: rules })),
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
            this.notification.showNotification('Error al obtener reglas de contraseña', 'error')
            return of(pwRulesFail());
          }
        )
      ))
    )
  );

  profilesRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.profilesRequest),
      mergeMap(() => this.usersService.getProfiles().pipe(
        map((profiles: Array<Profiles>) => profilesSuccess({ profiles: profiles })),
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
            this.notification.showNotification('Error al obtener perfiles', 'error')
            return of(profilesFail());
          }
        )
      ))
    )
  );

  // Get by IDs

  userRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.userRequest),
      mergeMap((user_id: { id: string }) => this.usersService.getUser(user_id.id).pipe(
        map((user: UserModel) => userSuccess({ user: user })),
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
            this.notification.showNotification('Error al obtene el usuario', 'error')
            return of(userFail());
          }
        )
      ))
    )
  );

  // Create

  userCreateRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.userCreateRequest),
      mergeMap((payload: { user: UserCreate}) => this.usersService.createUser(payload.user).pipe(
        map(() => userCreateSuccess()),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          (err) => {
            const msg = err.error ? err.error.message : 'Error al crear el usuario';
            this.notification.showNotification(msg, 'error');
            return of(userCreateFail());
          }
        )
      ))
    )
  );

  // Edit

  userEditRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.userEditRequest),
      mergeMap((payload: { user: Partial<UserModel>}) => this.usersService.editUser(payload.user).pipe(
        map(() => userEditSuccess()),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          (err) => {
            const msg = err.error ? err.error.message : 'Error al editar el usuario';
            this.notification.showNotification(msg, 'error');
            return of(userEditFail());
          }
        )
      ))
    )
  );

  userEditPasswordRequestEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.userEditPasswordRequest),
      mergeMap((payload: { id: string, password: { password: string, verifyPassword: string } }) => this.usersService.editUserPassword(payload.id, payload.password).pipe(
        map(() => {
          this.notification.showNotification('Se ha actualizado la contraseña del usuario', 'success');
          return userEditPasswordSuccess()
        }),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          (err) => {
            const msg = err.error ? err.error.message : 'Error al editar la contraseña del usuario';
            this.notification.showNotification(msg, 'error');
            return of(userEditPasswordFail());
          }
        )
      ))
    )
  );

  userEditDeactivateEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.userEditDeactivateRequest),
      mergeMap((payload: { id: string}) => this.usersService.deleteUser(payload.id).pipe(
        map(() => {
          return userEditDeactivateSuccess()
        }),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          (err) => {
            const msg = err.error ? err.error.message : 'Error al desactivar al usuario';
            this.notification.showNotification(msg, 'error');
            return of(userEditDeactivateFail());
          }
        )
      ))
    )
  );

  userEditActivateEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.userEditActivateRequest),
      mergeMap((payload: { id: string}) => this.usersService.activateUser(payload.id).pipe(
        map(() => {
          return userEditActivateSuccess()
        }),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          (err) => {
            const msg = err.error ? err.error.message : 'Error al activar al usuario';
            this.notification.showNotification(msg, 'error');
            return of(userEditActivateFail());
          }
        )
      ))
    )
  );

  userEditProfileEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(UsersActionTypes.userEditProfileRequest),
      mergeMap((payload: { id: string, profile: { profile_id: number } }) => this.usersService.editProfileUser(payload.id, payload.profile).pipe(
        map(() => {
          return userEditProfileSuccess()
        }),
        retryWhen(error => error.pipe(
          mergeMap(val => {
            if (val.error && val.error.statusCode === 401) {
              return of(refreshRequest({}));
            }
            return throwError(val);
          })
        )),
        catchError(
          (err) => {
            const msg = err.error ? err.error.message : 'Error al asignar un perfil al usuario';
            this.notification.showNotification(msg, 'error');
            return of(userEditProfileFail());
          }
        )
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private notification: SnackNotificationService,
  ) {}

}
