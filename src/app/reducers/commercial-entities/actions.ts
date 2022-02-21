import { createAction, props } from '@ngrx/store';
import { EntitiesActionTypes } from './types';
import { CommercialList, Commercial, CreateCommercialBody, EditCommercialBody } from 'src/app/models/commercial-entities';
import { QueryParameters } from 'src/app/models/general';

// Read

export const allCommercialsRequest = createAction(
  EntitiesActionTypes.allCommercialsRequest,
  props<QueryParameters>()
);

export const allCommercialsSuccess = createAction(
  EntitiesActionTypes.allCommercialsSuccess,
  props<{ all_commercials: CommercialList }>()
);

export const allCommercialsFail = createAction(
  EntitiesActionTypes.allCommercialsFail,
);

export const commercialRequest = createAction(
  EntitiesActionTypes.commercialRequest,
  props<{ id: number }>()
);

export const commercialSuccess = createAction(
  EntitiesActionTypes.commercialSuccess,
  props<{ commercial: Commercial }>()
);

export const commercialFail = createAction(
  EntitiesActionTypes.commercialFail,
);

// Create

export const commercialCreateRequest = createAction(
  EntitiesActionTypes.commercialCreateRequest,
  props<{ commercial: CreateCommercialBody }>()
);

export const commercialCreateSuccess = createAction(
  EntitiesActionTypes.commercialCreateSuccess
);

export const commercialCreateFail = createAction(
  EntitiesActionTypes.commercialCreateFail,
);

// Edit

export const commercialEditRequest = createAction(
  EntitiesActionTypes.commercialEditRequest,
  props<{ commercial: EditCommercialBody }>()
);

export const commercialEditSuccess = createAction(
  EntitiesActionTypes.commercialEditSuccess,
);

export const commercialEditFail = createAction(
  EntitiesActionTypes.commercialEditFail,
);

// Delete

export const commercialDeleteRequest = createAction(
  EntitiesActionTypes.commercialDeleteRequest,
  props<{ id: number }>()
);

export const commercialDeleteSuccess = createAction(
  EntitiesActionTypes.commercialDeleteSuccess,
);

export const commercialDeleteFail = createAction(
  EntitiesActionTypes.commercialDeleteFail,
);
