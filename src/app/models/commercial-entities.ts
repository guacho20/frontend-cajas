import { AuditMixin } from './mixin';
import { City, BusinessType, CashBox } from './settings';
import { Day, State } from './general';
import { UserModel } from './users';

export interface AttentionDays extends AuditMixin {
  id: number;
  commercial: Commercial;
  days: Day;
  start_time: string;
  end_time: string;
}

export interface CreateAttDayBody {
  att: Partial<AttentionDays>;
  commercial_id: number;
  day_id: number;
}

export interface EditAttDayBody {
  att: Partial<AttentionDays>;
  day_id?: number;
}

export interface CommercialPartial {
  name: string;
  ruc: string;
  owner: string;
  email: string;
  phone: string;
  cellphone: string;
}

export interface CommercialList {
  total_count: number;
  commercials: Array<CommercialPartial>;
}

export interface Commercial extends AuditMixin {
  id: number;
  city: City;
  type: BusinessType;
  state: State;
  attention_days: AttentionDays[];
  name: string;
  ruc: string;
  owner: string;
  email: string;
  phone: string;
  cellphone: string;
  address: string;
  entry_date: Date;
  end_date: Date;
  abbr: string;
  photo: string;
  lon: string;
  lat: string;
}

export interface CreateCommercialBody {
  commercial: Partial<Commercial>;
  city_id: number;
  type_id: number;
  state_id?: number;
}

export interface EditCommercialBody {
  commercial: Partial<Commercial>;
  city_id?: number;
  type_id?: number;
  state_id?: number;
}

export interface CommercialCashbox extends AuditMixin {
  id: number;
  cashbox: CashBox;
  commercial: Commercial;
  abbr: string;
}

export interface CreateCommercialCashBoxBody {
  commercial_cashbox: Partial<CommercialCashbox>;
  commercial_id: number;
  cash_id: number;
}

export interface EditCommercialCashBoxBody {
  commercial_cashbox: Partial<CommercialCashbox>;
  cash_id?: number;
}

export interface IdentityDocument extends AuditMixin {
  id: number;
  detail: string;
}

export interface Cashier extends AuditMixin {
  id: number;
  commercial_cashbox: CommercialCashbox;
  commercial: Commercial;
  identity_doc: IdentityDocument;
  state: State;
  user: UserModel;
  names: string;
  document: string;
  birth_date: Date;
  genre: string;
  email: string;
  cellphone: string;
  phone: string;
  address: string;
}

export interface CreateCashierBody {
  cashier: Partial<Cashier>;
  commercial_id: number;
  cash_id: number;
  id_doc: string;
  user_id: number;
  state_id?: number;
}

export interface EditCashierBody {
  cashier: Partial<Cashier>;
  id_doc?: string;
  state_id?: number;
}
