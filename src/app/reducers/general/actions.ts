import { createAction, props } from '@ngrx/store';
import { GeneralActionTypes } from './types';
import { State, Day } from 'src/app/models/general';

// Read

export const statesRequest = createAction(
  GeneralActionTypes.statesRequest,
);

export const statesSuccess = createAction(
  GeneralActionTypes.statesSuccess,
  props<{ states: Array<State> }>()
);

export const statesFail = createAction(
  GeneralActionTypes.statesFail,
);

export const daysRequest = createAction(
  GeneralActionTypes.daysRequest,
);

export const daysSuccess = createAction(
  GeneralActionTypes.daysSuccess,
  props<{ days: Array<Day> }>()
);

export const daysFail = createAction(
  GeneralActionTypes.daysFail,
);
