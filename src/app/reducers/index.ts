import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  Action,
  MetaReducer
} from '@ngrx/store';
import {merge, pick} from 'lodash-es';
import { authReducer, AuthState } from './auth/reducers';
import { UsersState, usersReducer } from './users/reducers';
import { AuditState, auditReducer } from './audit/reducers';
import { CoreState, coreReducer } from './core/reducers';
import { SettingsState, settingsReducer } from './settings/reducers';
import { GeneralState, generalReducer } from './general/reducers';
import { EntitiesState, entitiesReducer } from './commercial-entities/reducers';


export interface State {
  auth: AuthState,
  users: UsersState,
  audit: AuditState,
  core: CoreState,
  settings: SettingsState,
  general: GeneralState,
  entities: EntitiesState
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  users: usersReducer,
  audit: auditReducer,
  core: coreReducer,
  settings: settingsReducer,
  general: generalReducer,
  entities: entitiesReducer
};

export function storageMetaReducer<S, A extends Action = Action>() {
  let onInit = true; // after load/refresh…
  return function(reducer: ActionReducer<S, A>) {
    return function(state: S, action: A): S {
      // get the next state.
      const nextState = reducer(state, action);
      // init the application state.
      if (onInit) {
        onInit           = false;
        const savedData = localStorage.getItem('appState');
        if (savedData) {
          const savedState = JSON.parse(savedData);
          return merge(nextState, savedState);
        }
      }

      // save the next state to the application storage.
      const stateToSave = pick(nextState, ['auth']);
      localStorage.setItem('appState', JSON.stringify(stateToSave));

      return nextState;
    };
  };
}


export const metaReducers: MetaReducer<State>[] = [
  storageMetaReducer(),
];
