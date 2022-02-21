import { AuditMixin } from './mixin';

export interface UserList extends AuditMixin {
  id: string;
  name: string;
  email: string;
  profile: {
    id: number;
    profile: string;
  };
}

export interface UserModel extends AuditMixin {
  id: string;
  name: string;
  email: string;
  profile: number;
  expiration_date: Date;
  locked: boolean;
  password_change: boolean;
  theme: string;
}

export interface PasswordRules extends AuditMixin {
  id: number;
  name: string;
  min_lenght: number;
  special_chars_num: number;
  capital_letters_num: number;
  lower_letters_num: number;
  numbers_num: number;
  attemps: number;
  previous_valid_num: number;
  [prop: string]: string | boolean | Date | number;
}

export interface Profiles extends AuditMixin {
  id: number;
  password_rules: number;
  profile: string;
  detail: string;
  apply_pass_history: boolean;
  [prop: string]: string | boolean | Date | number;
}

export interface UserCreate {

  profile_id: number;

  password: string;

  name: string;

  email: string;

  // expiration_date?: Date;

  theme: string;

  // photo?: string;
}
