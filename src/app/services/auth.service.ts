import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt from 'jwt-decode';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { TokenDecoded } from '../models/token';
import { logout } from '../reducers/auth/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token$ = this.store.select(state => state.auth);
  private token: string;
  private refreshToken: string;
  private decoded: TokenDecoded;

  constructor(
    private http: HttpClient,
    private store: Store<State>
  ) {
    this.token$.subscribe(val => {
      this.token = val.access_token;
      this.refreshToken = val.refresh_token;
      if (this.token) {
        this.decoded = jwt(this.token) as TokenDecoded;
      }
    });
  }

  login(payload: { email: string, password: string }) {
    return this.http.post(
      `${environment.apiUrl}auth/login`,
      payload
    );
  }

  refreshLogin() {
    return this.http.get(
      `${environment.apiUrl}auth/refresh`,
    );
  }

  logoutUser() {
    this.store.dispatch(logout())
  }

  getToken() {
    return this.token;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  profile() {
    return this.decoded;
  }
}
