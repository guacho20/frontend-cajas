import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QueryParameters } from '../models/general';
import { CreateCommercialBody, EditCommercialBody } from '../models/commercial-entities';

@Injectable({
  providedIn: 'root'
})
export class CommercialEntitiesService {

  constructor(private http: HttpClient) { }

  /*
  *
  *  Commercial Endpoints
  *
  */

  getAllCommercials(payload: QueryParameters) {
    const { page, qty, sortf, order } = payload;
    return this.http.get(`${environment.apiUrl}commercial-entities/commercials?page=${page}&qty=${qty}&sortf=${sortf}&order=${order}`);
  }

  getCommercial(id: number) {
    return this.http.get(`${environment.apiUrl}commercial-entities/commercial/${id}`);
  }

  createCommercial(payload: CreateCommercialBody) {
    return this.http.post(`${environment.apiUrl}commercial-entities/commercial`, payload);
  }

  editCommercial(payload: EditCommercialBody) {
    return this.http.put(`${environment.apiUrl}commercial-entities/commercial`, payload);
  }

  deleteCommercial(id: number) {
    return this.http.delete(`${environment.apiUrl}commercial-entities/commercial/${id}`);
  }
}
