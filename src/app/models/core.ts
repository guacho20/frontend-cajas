import { AuditMixin } from './mixin';

export interface EmailServer extends AuditMixin {
  id: number;
  user: string;
  email: string;
  password: string;
  smtp_address: string;
  port: string;
}
