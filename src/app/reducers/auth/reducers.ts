import { Action, createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, refreshSuccess } from './actions';


export interface AuthState {
  access_token?: string;
  refresh_token?: string;
}

export const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
};

const authCreateReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { access_token, refresh_token }) => ({ ...state, access_token: access_token, refresh_token: refresh_token })),
  on(refreshSuccess, (state, { access_token, refresh_token }) => ({ ...state, access_token: access_token, refresh_token: refresh_token })),
  on(logout, state => ({ access_token: null, refresh_token: null })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authCreateReducer(state, action);
}
