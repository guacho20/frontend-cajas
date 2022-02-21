import { createReducer, Action, on } from '@ngrx/store';
import { allCommercialsSuccess, commercialSuccess } from './actions';
import { CommercialList, Commercial } from 'src/app/models/commercial-entities';

export interface EntitiesState {
  all_commercials: CommercialList;
  commercial: Commercial;
}

export const initialState: EntitiesState = {
  all_commercials: {
    total_count: 0,
    commercials: []
  },
  commercial: null
};

const _entitiesReducer = createReducer(
  initialState,
  on(allCommercialsSuccess, (state, { all_commercials }) => ({ ...state, all_commercials: all_commercials })),
  on(commercialSuccess, (state, { commercial }) => ({ ...state, commercial: commercial })),
);

export function entitiesReducer(state: EntitiesState | undefined, action: Action) {
  return _entitiesReducer(state, action);
}
