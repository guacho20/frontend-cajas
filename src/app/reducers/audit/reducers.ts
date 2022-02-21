import { Action, createReducer, on } from '@ngrx/store';
import { auditAccessSuccess } from "./actions";
import { AuditAccess } from 'src/app/models/audit';

export interface AuditState {
  access: {
    total: number;
    items: Array<AuditAccess>;
  };
}

export const initialState: AuditState = {
  access: {
    total: 0,
    items: []
  },
};

const _auditReducer = createReducer(
  initialState,
  on(auditAccessSuccess, (state, { access }) => ({ ...state, access: access })),
);

export function auditReducer(state: AuditState | undefined, action: Action) {
  return _auditReducer(state, action);
}
