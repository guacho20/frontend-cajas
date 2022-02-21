import { createReducer, Action, on } from '@ngrx/store';
import { EmailServer } from 'src/app/models/core';
import { emailSSuccess } from './actions';

export interface CoreState {
  email_servers: Array<EmailServer>;
}

export const initialState: CoreState = {
  email_servers: [],
};

const _coreReducer = createReducer(
  initialState,
  on(emailSSuccess, (state, { email_servers }) => ({ ...state, email_servers: [...email_servers] })),
);

export function coreReducer(state: CoreState | undefined, action: Action) {
  return _coreReducer(state, action);
}
