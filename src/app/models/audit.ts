import { UserList } from './users';

export interface AuditAction {
  id: number;
  name: string;
  detail: string;
}

export interface AuditAccess {
  id: number;
  user: UserList;
  audit_action: AuditAction;
  audit_date: Date;
  ip: string;
  action: string;
}
