import { Action, createReducer, on } from '@ngrx/store';
import { usersSuccess, pwRulesSuccess, profilesSuccess, userSuccess } from "./actions";
import { UserList, PasswordRules, Profiles, UserModel } from 'src/app/models/users';

export interface UsersState {
  users: Array<UserList>;
  rules: Array<PasswordRules>;
  profiles: Array<Profiles>;
  user: UserModel
}

export const initialState: UsersState = {
  users: [],
  rules: [],
  profiles: [],
  user: null
};

const _usersReducer = createReducer(
  initialState,
  on(usersSuccess, (state, { users }) => ({ ...state, users: [...users] })),
  on(pwRulesSuccess, (state, { rules }) => ({ ...state, rules: [...rules] })),
  on(profilesSuccess, (state, { profiles }) => ({ ...state, profiles: [...profiles] })),
  on(userSuccess, (state, { user }) => ({ ...state, user: user })),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action);
}

