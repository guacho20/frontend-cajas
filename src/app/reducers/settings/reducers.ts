import { createReducer, Action, on } from '@ngrx/store';
import { provincesSuccess, banksSuccess, payMethodsSuccess, businessTypesSuccess, cashboxesSuccess, departmentsSuccess, citiesSuccess, citiesDelete, citiesAllSuccess } from './actions';
import { Province, Bank, PaymentMethod, BusinessType, CashBox, Department, City } from 'src/app/models/settings';

export interface SettingsState {
  province: Array<Province>;
  cities: Array<City>;
  all_cities: Array<City>;
  banks: Array<Bank>;
  pms: Array<PaymentMethod>;
  business_types: Array<BusinessType>;
  cashboxes: Array<CashBox>;
  departments: Array<Department>;
}

export const initialState: SettingsState = {
  province: [],
  cities: [],
  all_cities: [],
  banks: [],
  pms: [],
  business_types: [],
  cashboxes: [],
  departments: [],
};

const _settingsReducer = createReducer(
  initialState,
  on(provincesSuccess, (state, { provinces }) => ({ ...state, province: [...provinces] })),
  on(citiesSuccess, (state, { cities }) => ({ ...state, cities: [...cities] })),
  on(citiesAllSuccess, (state, { cities }) => ({ ...state, all_cities: [...cities] })),
  on(citiesDelete, (state) => ({ ...state, cities: [] })),
  on(banksSuccess, (state, { banks }) => ({ ...state, banks: [...banks] })),
  on(payMethodsSuccess, (state, { pms }) => ({ ...state, pms: [...pms] })),
  on(businessTypesSuccess, (state, { business_types }) => ({ ...state, business_types: [...business_types] })),
  on(cashboxesSuccess, (state, { cashboxes }) => ({ ...state, cashboxes: [...cashboxes] })),
  on(departmentsSuccess, (state, { departments }) => ({ ...state, departments: [...departments] })),
);

export function settingsReducer(state: SettingsState | undefined, action: Action) {
  return _settingsReducer(state, action);
}
