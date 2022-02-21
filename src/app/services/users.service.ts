import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel, UserCreate } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${environment.apiUrl}user/users`);
  }

  getUser(id: string) {
    return this.http.get(`${environment.apiUrl}user/user/${id}`);
  }

  createUser(body: UserCreate) {
    return this.http.post(`${environment.apiUrl}auth/signup/`, body);
  }

  editUser(body: Partial<UserModel>) {
    return this.http.put(`${environment.apiUrl}auth/edit/`, body);
  }

  editUserPassword(id: string, body: { password: string, verifyPassword: string }) {
    return this.http.put(`${environment.apiUrl}auth/edit/password/${id}`, body);
  }

  editProfileUser(user_id: string, body: { profile_id: number }) {
    return this.http.put(`${environment.apiUrl}user/profile/${user_id}`, body);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}auth/delete/${id}`);
  }

  activateUser(id: string) {
    return this.http.get(`${environment.apiUrl}auth/activate/${id}`);
  }

  getRules() {
    return this.http.get(`${environment.apiUrl}user/pw_rules`);
  }

  getProfiles() {
    return this.http.get(`${environment.apiUrl}user/profiles`);
  }
}
