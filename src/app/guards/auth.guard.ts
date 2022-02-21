import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as jwt from 'jwt-decode';
import { logout, refreshRequest } from '../reducers/auth/actions';
import { TokenDecoded } from '../models/token';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token$: Observable<string> = this.store.select(state => state.auth.access_token);
  token: string;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.token$.subscribe(val => this.token = val);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if((state.url.match('/dashboard') ?? []).length > 0) {
      if (this.token) {
        const decoded = jwt(this.token) as TokenDecoded;
        if (Date.now() > decoded.exp * 1000) {
          this.store.dispatch(refreshRequest({ url: next.url.map(i => i.path).join('/')}));
        }
        return true;
      }
      return false;
    } else if (this.token) {
        this.router.navigate(['/dashboard']);
        return false;
    }
    return true;
  }

}
