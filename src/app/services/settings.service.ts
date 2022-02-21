import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Province, CityDto, City, Bank, PaymentMethod, BusinessType, CashBox, Department } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  // Provincias
  getProvinces() {
    return this.http.get(`${environment.apiUrl}general/provinces`);
  }

  createProvince(body: Province) {
    return this.http.post(`${environment.apiUrl}general/province`, body);
  }

  editProvince(body: Province) {
    return this.http.put(`${environment.apiUrl}general/province`, body);
  }

  deleteProvince(id: number) {
    return this.http.delete(`${environment.apiUrl}general/province/${id}`);
  }

  getCities(provinceID: number) {
    return this.http.get(`${environment.apiUrl}general/cities/${provinceID}`);
  }

  getAllCities() {
    return this.http.get(`${environment.apiUrl}general/allCities`);
  }

  createCity(body: CityDto) {
    return this.http.post(`${environment.apiUrl}general/city`, body);
  }

  editCity(body: City) {
    return this.http.put(`${environment.apiUrl}general/city`, body);
  }

  deleteCity(id: number) {
    return this.http.delete(`${environment.apiUrl}general/city/${id}`);
  }

  // Bancos
  getBanks() {
    return this.http.get(`${environment.apiUrl}commercial-settings/banks`);
  }

  createBank(body: Bank) {
    return this.http.post(`${environment.apiUrl}commercial-settings/bank`, body);
  }

  editBank(body: Bank) {
    return this.http.put(`${environment.apiUrl}commercial-settings/bank`, body);
  }

  deleteBank(id: number) {
    return this.http.delete(`${environment.apiUrl}commercial-settings/bank/${id}`);
  }

  // Métodos de pago
  getPaymentMethods() {
    return this.http.get(`${environment.apiUrl}commercial-settings/methods`);
  }

  createPaymentMethod(body: PaymentMethod) {
    return this.http.post(`${environment.apiUrl}commercial-settings/method`, body);
  }

  editPaymentMethod(body: PaymentMethod) {
    return this.http.put(`${environment.apiUrl}commercial-settings/method`, body);
  }

  deletePaymentMethod(id: number) {
    return this.http.delete(`${environment.apiUrl}commercial-settings/method/${id}`);
  }

  // Tipos de negocio
  getBusinessTypes() {
    return this.http.get(`${environment.apiUrl}commercial-settings/bstypes`);
  }

  createBusinessType(body: BusinessType) {
    return this.http.post(`${environment.apiUrl}commercial-settings/bstype`, body);
  }

  editBusinessType(body: BusinessType) {
    return this.http.put(`${environment.apiUrl}commercial-settings/bstype`, body);
  }

  deleteBusinessType(id: number) {
    return this.http.delete(`${environment.apiUrl}commercial-settings/bstype/${id}`);
  }

  // Cajas
  getCashboxes() {
    return this.http.get(`${environment.apiUrl}commercial-settings/cashboxes`);
  }

  createCashbox(body: CashBox) {
    return this.http.post(`${environment.apiUrl}commercial-settings/cashbox`, body);
  }

  editCashbox(body: CashBox) {
    return this.http.put(`${environment.apiUrl}commercial-settings/cashbox`, body);
  }

  deleteCashbox(id: number) {
    return this.http.delete(`${environment.apiUrl}commercial-settings/cashbox/${id}`);
  }

  // Departamentos
  getDepartments() {
    return this.http.get(`${environment.apiUrl}commercial-settings/departments`);
  }

  createDepartment(body: Department) {
    return this.http.post(`${environment.apiUrl}commercial-settings/department`, body);
  }

  editDepartment(body: Department) {
    return this.http.put(`${environment.apiUrl}commercial-settings/department`, body);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${environment.apiUrl}commercial-settings/department/${id}`);
  }

}
