import { createReducer, Action, on } from '@ngrx/store';
import { statesSuccess, daysSuccess } from './actions';
import { State, Day } from 'src/app/models/general';

export interface GeneralState {
  states: Array<State>;
  days: Array<Day>;
}

export const initialState: GeneralState = {
  states: [],
  days: [],
};

const _generalReducer = createReducer(
  initialState,
  on(statesSuccess, (state, { states }) => ({ ...state, states: [...states] })),
  on(daysSuccess, (state, { days }) => ({ ...state, days: [...days] })),
);

export function generalReducer(state: GeneralState | undefined, action: Action) {
  return _generalReducer(state, action);
}
