import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/services/auth.service';
import { TokenDecoded } from 'src/app/models/token';
import { Router, NavigationEnd } from '@angular/router';
import { State } from 'src/app/reducers';
import { statesRequest, daysRequest } from 'src/app/reducers/general/actions';
import { citiesAllRequest, businessTypesRequest, banksRequest } from 'src/app/reducers/settings/actions';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  public profile: TokenDecoded;
  route: string;

  private routerSubscription: Subscription;

  @ViewChild('themeContainer') themeContainer:  ElementRef<HTMLDivElement>;
  @ViewChild(MatDrawer) drawer:  MatDrawer;
  toolbarAllWidth = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    this.profile = this.auth.profile();
    this.route = this.router.url;
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      tap(nav => this.route = nav.url),
    ).subscribe();
    this.store.dispatch(statesRequest());
    this.store.dispatch(daysRequest());
    this.store.dispatch(citiesAllRequest());
    this.store.dispatch(businessTypesRequest());
    this.store.dispatch(banksRequest());
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  logout() {
    this.auth.logoutUser();
  }

  closeSidenav() {
    this.drawer.toggle()
    this.toolbarAllWidth = !this.toolbarAllWidth;
  }

  changeTheme() {
    this.themeContainer.nativeElement.classList.toggle('dark-theme');
  }

}
