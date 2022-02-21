import { AuditMixin } from './mixin';

export interface QueryParameters { page: number; qty: number; sortf: string; order: string }

export interface Day extends AuditMixin {
  id: number;
  detail: string;
}

export interface State extends AuditMixin {
  id: number;
  detail: string;
}
