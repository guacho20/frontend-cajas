import { createAction, props } from '@ngrx/store';
import { SettingsActionTypes } from './types';
import { Province, Bank, PaymentMethod, BusinessType, CashBox, Department, City, CityDto } from 'src/app/models/settings';

// Read

export const provincesRequest = createAction(
  SettingsActionTypes.provincesRequest,
);

export const provincesSuccess = createAction(
  SettingsActionTypes.provincesSuccess,
  props<{ provinces: Array<Province> }>()
);

export const provincesFail = createAction(
  SettingsActionTypes.provincesFail,
);

export const citiesAllRequest = createAction(
  SettingsActionTypes.citiesAllRequest,
);

export const citiesAllSuccess = createAction(
  SettingsActionTypes.citiesAllSuccess,
  props<{ cities: Array<City> }>()
);

export const citiesAllFail = createAction(
  SettingsActionTypes.citiesAllFail,
);

export const citiesRequest = createAction(
  SettingsActionTypes.citiesRequest,
  props<{ province_id: number }>()
);

export const citiesSuccess = createAction(
  SettingsActionTypes.citiesSuccess,
  props<{ cities: Array<City> }>()
);

export const citiesFail = createAction(
  SettingsActionTypes.citiesFail,
);

export const citiesDelete = createAction(
  SettingsActionTypes.citiesDelete,
);

export const banksRequest = createAction(
  SettingsActionTypes.banksRequest,
);

export const banksSuccess = createAction(
  SettingsActionTypes.banksSuccess,
  props<{ banks: Array<Bank> }>()
);

export const banksFail = createAction(
  SettingsActionTypes.banksFail,
);

export const payMethodsRequest = createAction(
  SettingsActionTypes.payMethodsRequest,
);

export const payMethodsSuccess = createAction(
  SettingsActionTypes.payMethodsSuccess,
  props<{ pms: Array<PaymentMethod> }>()
);

export const payMethodsFail = createAction(
  SettingsActionTypes.payMethodsFail,
);

export const businessTypesRequest = createAction(
  SettingsActionTypes.businessTypesRequest,
);

export const businessTypesSuccess = createAction(
  SettingsActionTypes.businessTypesSuccess,
  props<{ business_types: Array<BusinessType> }>()
);

export const businessTypesFail = createAction(
  SettingsActionTypes.businessTypesFail,
);

export const cashboxesRequest = createAction(
  SettingsActionTypes.cashboxesRequest,
);

export const cashboxesSuccess = createAction(
  SettingsActionTypes.cashboxesSuccess,
  props<{ cashboxes: Array<CashBox> }>()
);

export const cashboxesFail = createAction(
  SettingsActionTypes.cashboxesFail,
);

export const departmentsRequest = createAction(
  SettingsActionTypes.departmentsRequest,
);

export const departmentsSuccess = createAction(
  SettingsActionTypes.departmentsSuccess,
  props<{ departments: Array<Department> }>()
);

export const departmentsFail = createAction(
  SettingsActionTypes.departmentsFail,
);

// Create

export const provinceCreateRequest = createAction(
  SettingsActionTypes.provinceCreateRequest,
  props<{ province: Province }>()
);

export const provinceCreateSuccess = createAction(
  SettingsActionTypes.provinceCreateSuccess
);

export const provinceCreateFail = createAction(
  SettingsActionTypes.provinceCreateFail,
);

export const cityCreateRequest = createAction(
  SettingsActionTypes.cityCreateRequest,
  props<{ city: CityDto }>()
);

export const cityCreateSuccess = createAction(
  SettingsActionTypes.cityCreateSuccess,
);

export const cityCreateFail = createAction(
  SettingsActionTypes.cityCreateFail,
);

export const bankCreateRequest = createAction(
  SettingsActionTypes.bankCreateRequest,
  props<{ bank: Bank }>()
);

export const bankCreateSuccess = createAction(
  SettingsActionTypes.bankCreateSuccess,
);

export const bankCreateFail = createAction(
  SettingsActionTypes.bankCreateFail,
);

export const payMethodCreateRequest = createAction(
  SettingsActionTypes.payMethodCreateRequest,
  props<{ pm: PaymentMethod }>()
);

export const payMethodCreateSuccess = createAction(
  SettingsActionTypes.payMethodCreateSuccess,
);

export const payMethodCreateFail = createAction(
  SettingsActionTypes.payMethodCreateFail,
);

export const businessCreateRequest = createAction(
  SettingsActionTypes.businessTypeCreateRequest,
  props<{ business_type: BusinessType }>()
);

export const businessCreateSuccess = createAction(
  SettingsActionTypes.businessTypeCreateSuccess,
);

export const businessCreateFail = createAction(
  SettingsActionTypes.businessTypeCreateFail,
);

export const cashboxCreateRequest = createAction(
  SettingsActionTypes.cashboxCreateRequest,
  props<{ cashbox: CashBox }>()
);

export const cashboxCreateSuccess = createAction(
  SettingsActionTypes.cashboxCreateSuccess,
);

export const cashboxCreateFail = createAction(
  SettingsActionTypes.cashboxCreateFail,
);

export const departmentCreateRequest = createAction(
  SettingsActionTypes.departmentCreateRequest,
  props<{ department: Department }>()
);

export const departmentCreateSuccess = createAction(
  SettingsActionTypes.departmentCreateSuccess,
);

export const departmentCreateFail = createAction(
  SettingsActionTypes.departmentCreateFail,
);

// Edit

export const provinceEditRequest = createAction(
  SettingsActionTypes.provinceEditRequest,
  props<{ province: Province }>()
);

export const provinceEditSuccess = createAction(
  SettingsActionTypes.provinceEditSuccess,
);

export const provinceEditFail = createAction(
  SettingsActionTypes.provinceEditFail,
);

export const cityEditRequest = createAction(
  SettingsActionTypes.cityEditRequest,
  props<{ city: City }>()
);

export const cityEditSuccess = createAction(
  SettingsActionTypes.cityEditSuccess,
);

export const cityEditFail = createAction(
  SettingsActionTypes.cityEditFail,
);

export const bankEditRequest = createAction(
  SettingsActionTypes.bankEditRequest,
  props<{ bank: Bank }>()
);

export const bankEditSuccess = createAction(
  SettingsActionTypes.bankEditSuccess,
);

export const bankEditFail = createAction(
  SettingsActionTypes.bankEditFail,
);

export const payMethodEditRequest = createAction(
  SettingsActionTypes.payMethodEditRequest,
  props<{ pm: PaymentMethod }>()
);

export const payMethodEditSuccess = createAction(
  SettingsActionTypes.payMethodEditSuccess,
);

export const payMethodEditFail = createAction(
  SettingsActionTypes.payMethodEditFail,
);

export const businessEditRequest = createAction(
  SettingsActionTypes.businessTypeEditRequest,
  props<{ business_type: BusinessType }>()
);

export const businessEditSuccess = createAction(
  SettingsActionTypes.businessTypeEditSuccess,
);

export const businessEditFail = createAction(
  SettingsActionTypes.businessTypeEditFail,
);

export const cashboxEditRequest = createAction(
  SettingsActionTypes.cashboxEditRequest,
  props<{ cashbox: CashBox }>()
);

export const cashboxEditSuccess = createAction(
  SettingsActionTypes.cashboxEditSuccess,
);

export const cashboxEditFail = createAction(
  SettingsActionTypes.cashboxEditFail,
);

export const departmentEditRequest = createAction(
  SettingsActionTypes.departmentEditRequest,
  props<{ department: Department }>()
);

export const departmentEditSuccess = createAction(
  SettingsActionTypes.departmentEditSuccess,
);

export const departmentEditFail = createAction(
  SettingsActionTypes.departmentEditFail,
);

// Delete

export const provinceDeleteRequest = createAction(
  SettingsActionTypes.provinceDeleteRequest,
  props<{ id: number }>()
);

export const provinceDeleteSuccess = createAction(
  SettingsActionTypes.provinceDeleteSuccess,
);

export const provinceDeleteFail = createAction(
  SettingsActionTypes.provinceDeleteFail,
);

export const cityDeleteRequest = createAction(
  SettingsActionTypes.cityDeleteRequest,
  props<{ id: number }>()
);

export const cityDeleteSuccess = createAction(
  SettingsActionTypes.cityDeleteSuccess,
);

export const cityDeleteFail = createAction(
  SettingsActionTypes.cityDeleteFail,
);

export const bankDeleteRequest = createAction(
  SettingsActionTypes.bankDeleteRequest,
  props<{ id: number }>()
);

export const bankDeleteSuccess = createAction(
  SettingsActionTypes.bankDeleteSuccess,
);

export const bankDeleteFail = createAction(
  SettingsActionTypes.bankDeleteFail,
);

export const payMethodDeleteRequest = createAction(
  SettingsActionTypes.payMethodDeleteRequest,
  props<{ id: number }>()
);

export const payMethodDeleteSuccess = createAction(
  SettingsActionTypes.payMethodDeleteSuccess,
);

export const payMethodDeleteFail = createAction(
  SettingsActionTypes.payMethodDeleteFail,
);

export const businessDeleteRequest = createAction(
  SettingsActionTypes.businessTypeDeleteRequest,
  props<{ id: number }>()
);

export const businessDeleteSuccess = createAction(
  SettingsActionTypes.businessTypeDeleteSuccess,
);

export const businessDeleteFail = createAction(
  SettingsActionTypes.businessTypeDeleteFail,
);

export const cashboxDeleteRequest = createAction(
  SettingsActionTypes.cashboxDeleteRequest,
  props<{ id: number }>()
);

export const cashboxDeleteSuccess = createAction(
  SettingsActionTypes.cashboxDeleteSuccess,
);

export const cashboxDeleteFail = createAction(
  SettingsActionTypes.cashboxDeleteFail,
);

export const departmentDeleteRequest = createAction(
  SettingsActionTypes.departmentDeleteRequest,
  props<{ id: number }>()
);

export const departmentDeleteSuccess = createAction(
  SettingsActionTypes.departmentDeleteSuccess,
);

export const departmentDeleteFail = createAction(
  SettingsActionTypes.departmentDeleteFail,
);
