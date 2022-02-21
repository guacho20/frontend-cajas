export interface AuditMixin {
  is_active: boolean;
  register_user: string;
  register_datetime: Date;
  update_user: string;
  update_datetime: Date;
}
