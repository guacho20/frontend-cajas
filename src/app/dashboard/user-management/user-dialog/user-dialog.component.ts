import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { UserModel, Profiles } from 'src/app/models/users';
import { userRequest, userEditRequest } from 'src/app/reducers/users/actions';

export interface UserDialogData {
  id: string;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, OnDestroy {

  user: UserModel;
  profiles: Array<Profiles>
  loading = true;

  userSub: Subscription;
  profilesSub: Subscription;

  formGroup: FormGroup;

  @ViewChild('formUser') formElem: ElementRef<HTMLFormElement>;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(userRequest({ id: this.data.id }))
    this.userSub = this.store.select(state => state.users.user).pipe(
      filter(user => user !== null),
      map(user => {
        this.user = user;
        this.formGroup = this.fb.group({
          id: this.fb.control(user.id, [Validators.required]),
          name: this.fb.control(user.name, [Validators.required]),
          email: this.fb.control(user.email, [Validators.required]),
          theme: this.fb.control(user.theme, [Validators.required]),
          locked: this.fb.control(user.locked ?? false, [Validators.required]),
        })
        this.loading = false;
      })
    ).subscribe();
    this.profilesSub = this.store.select(state => state.users.profiles).pipe(
      filter(profiles => profiles.length > 0),
      map(profiles => {
        this.profiles = profiles;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.profilesSub.unsubscribe();
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
      this.store.dispatch(userEditRequest({ user: this.formGroup.getRawValue() }));
      this.dialogRef.close(true);
    }
  }

}
