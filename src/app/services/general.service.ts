import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get(`${environment.apiUrl}general/states`);
  }

  getDays() {
    return this.http.get(`${environment.apiUrl}general/days`);
  }
}
