import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { State } from 'src/app/reducers';
import {
  usersRequest,
  pwRulesRequest,
  profilesRequest,
  userEditDeactivateRequest,
  userEditActivateRequest,
  userEditProfileRequest
} from 'src/app/reducers/users/actions';
import { UserList, PasswordRules, Profiles } from 'src/app/models/users';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatSort } from '@angular/material/sort';
import { UserCreateDialogComponent } from './user-create-dialog/user-create-dialog.component';
import { UsersActionTypes } from 'src/app/reducers/users/types';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'is_active', 'profile', 'actions'];
  passDisplayedColumns: string[] = ['name', 'min_lenght', 'special_chars_num', 'capital_letters_num', 'lower_letters_num', 'numbers_num', 'attemps', 'previous_valid_num'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  usersData: MatTableDataSource<UserList> = new MatTableDataSource();
  usersSub: Subscription;

  pwRulesData: Array<PasswordRules> = [];
  pwRulesSub: Subscription;

  profiles: Array<Profiles>;
  profilesSub: Subscription;

  actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.usersSub = this.store.select(state => state.users.users).pipe(
      filter(users => users.length > 0),
      map(users => this.usersData.data = users)
    ).subscribe();
    this.pwRulesSub = this.store.select(state => state.users.rules).pipe(
      filter(rules => rules.length > 0),
      map(rules => this.pwRulesData = rules)
    ).subscribe();
    this.profilesSub = this.store.select(state => state.users.profiles).pipe(
      filter(profiles => profiles.length > 0),
      map(profiles => this.profiles = profiles)
    ).subscribe();

    this.actionSub = this.actions$.pipe(
      ofType(
        UsersActionTypes.userCreateSuccess,
        UsersActionTypes.userEditSuccess,
        UsersActionTypes.userEditDeactivateSuccess,
        UsersActionTypes.userEditActivateSuccess,
        UsersActionTypes.userEditProfileSuccess
      ),
      map(() => this.store.dispatch(usersRequest()))
    ).subscribe()
  }

  ngOnInit(): void {
    this.usersData.paginator = this.paginator;
    this.usersData.sort = this.sort;
    this.store.dispatch(usersRequest());
    this.store.dispatch(pwRulesRequest());
    this.store.dispatch(profilesRequest());
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.pwRulesSub.unsubscribe();
    this.profilesSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersData.filter = filterValue.trim().toLowerCase();
  }

  createUser(): void {
    const dialogRef = this.dialog.open(UserCreateDialogComponent, {
      width: '300px',
      height: 'auto',
      data: { profiles: this.profiles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  openUser(user_id: string): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      height: 'auto',
      data: { id: user_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  onDeactivate(id: string) {
    this.store.dispatch(userEditDeactivateRequest({ id: id }));
  }

  onActivate(id: string) {
    this.store.dispatch(userEditActivateRequest({ id: id }));
  }

  editPassword(id: string): void {
    const dialogRef = this.dialog.open(UserChangePasswordComponent, {
      width: '300px',
      height: 'auto',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  onUpdateProfile(id: string, profile_id: number) {
    this.store.dispatch(userEditProfileRequest({ id: id, profile: { profile_id: profile_id } }));
  }
}
