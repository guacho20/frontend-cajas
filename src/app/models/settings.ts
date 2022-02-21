import { AuditMixin } from './mixin';

export interface Province extends AuditMixin {
  id: number;
  detail: string;
}

export interface City extends AuditMixin {
  id: number;
  detail: string;
}

export interface CityDto {
  city: Partial<City>;
  province_id: number;
}

export interface Bank extends AuditMixin {
  id: number;
  detail: string;
  code: string;
  abbr: string;
}

export interface PaymentMethod extends AuditMixin {
  id: number;
  detail: string;
}

export interface BusinessType extends AuditMixin {
  id: number;
  detail: string;
}

export interface CashBox extends AuditMixin {
  id: number;
  detail: string;
}

export interface Department extends AuditMixin {
  id: number;
  name: string;
  name_base: string;
}
