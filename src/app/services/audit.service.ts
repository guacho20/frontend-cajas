import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QueryParameters } from '../models/general';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient) {}

  getAuditAccess(payload: QueryParameters) {
    const { page, qty, sortf, order } = payload;
    return this.http.get(`${environment.apiUrl}audit/access?page=${page}&qty=${qty}&sortf=${sortf}&order=${order}`);
  }
}
