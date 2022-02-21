import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmailServer } from '../models/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  getEmailsServer() {
    return this.http.get(`${environment.apiUrl}core/emails`);
  }

  createEmailServer(body: EmailServer) {
    return this.http.post(`${environment.apiUrl}core/email`, body);
  }

  editEmailServer(body: EmailServer) {
    return this.http.put(`${environment.apiUrl}core/email`, body);
  }

  deleteEmailServer(id: number) {
    return this.http.delete(`${environment.apiUrl}core/email/${id}`);
  }
}
