import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Profiles } from 'src/app/models/users';
import { State } from 'src/app/reducers';
import { userCreateRequest } from 'src/app/reducers/users/actions';
import { Actions, ofType } from '@ngrx/effects';
import { UsersActionTypes } from 'src/app/reducers/users/types';
import { map } from 'rxjs/operators';

interface UserCreateDialogData {
  profiles: Array<Profiles>
}

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.scss']
})
export class UserCreateDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  userSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<UserCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserCreateDialogData,
    private fb: FormBuilder,
    private store: Store<State>,
    private actions$: Actions
  ) {
    this.formGroup = this.fb.group({
      profile_id: this.fb.control(3, [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      theme: this.fb.control('light', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.userSub = this.actions$.pipe(
      ofType(UsersActionTypes.userCreateSuccess),
      map(() => this.dialogRef.close(true))
    ).subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onSave($event: Event) {
    $event.preventDefault();
    this.save();
  }

  save() {
    if (this.formGroup.valid) {
      this.store.dispatch(userCreateRequest({ user: this.formGroup.getRawValue() }));
    }
  }

}
