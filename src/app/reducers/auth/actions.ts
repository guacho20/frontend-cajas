import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './types';

export const loginRequest = createAction(
  AuthActionTypes.loginRequest,
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.loginSuccess,
  props<{ access_token: string, refresh_token: string }>()
);

export const loginFail = createAction(
  AuthActionTypes.loginFail,
);

export const logout = createAction(
  AuthActionTypes.logout
);

export const refreshRequest = createAction(
  AuthActionTypes.refreshRequest,
  props<{ url?: string }>()
);

export const refreshSuccess = createAction(
  AuthActionTypes.refreshSuccess,
  props<{ access_token: string, refresh_token: string }>()
);

export const refreshFail = createAction(
  AuthActionTypes.refreshFail,
);
