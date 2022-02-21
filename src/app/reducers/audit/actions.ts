import { createAction, props } from '@ngrx/store';
import { AuditActionTypes } from './types';
import { AuditAccess } from 'src/app/models/audit';
import { QueryParameters } from 'src/app/models/general';

export const auditAccessRequest = createAction(
  AuditActionTypes.auditAccessRequest,
  props<QueryParameters>()
);

export const auditAccessSuccess = createAction(
  AuditActionTypes.auditAccessSuccess,
  props<{ access: {
    total: number;
    items: Array<AuditAccess>;
  } }>()
);

export const auditAccessFail = createAction(
  AuditActionTypes.auditAccessFail,
);
