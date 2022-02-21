import { createAction, props } from '@ngrx/store';
import { CoreActionTypes } from './types';
import { EmailServer } from 'src/app/models/core';

// Read

export const emailSRequest = createAction(
  CoreActionTypes.emailSRequest,
);

export const emailSSuccess = createAction(
  CoreActionTypes.emailSSuccess,
  props<{ email_servers: Array<EmailServer> }>()
);

export const emailSFail = createAction(
  CoreActionTypes.emailSFail,
);

// Create

export const emailCreateRequest = createAction(
  CoreActionTypes.emailCreateRequest,
  props<{ email: EmailServer }>()
);

export const emailCreateSuccess = createAction(
  CoreActionTypes.emailCreateSuccess
);

export const emailCreateFail = createAction(
  CoreActionTypes.emailCreateFail,
);

// Edit

export const emailEditRequest = createAction(
  CoreActionTypes.emailEditRequest,
  props<{ email: EmailServer }>()
);

export const emailEditSuccess = createAction(
  CoreActionTypes.emailEditSuccess,
);

export const emailEditFail = createAction(
  CoreActionTypes.emailEditFail,
);

// Delete

export const emailDeleteRequest = createAction(
  CoreActionTypes.emailDeleteRequest,
  props<{ id: number }>()
);

export const emailDeleteSuccess = createAction(
  CoreActionTypes.emailDeleteSuccess,
);

export const emailDeleteFail = createAction(
  CoreActionTypes.emailDeleteFail,
);
