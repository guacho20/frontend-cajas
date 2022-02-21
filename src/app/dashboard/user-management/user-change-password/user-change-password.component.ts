import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { userEditPasswordRequest } from 'src/app/reducers/users/actions';
import { SnackNotificationService } from 'src/app/services/snack-notification.service';

export interface UserDialogData {
  id: string;
}

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    private fb: FormBuilder,
    private store: Store<State>,
    private notification: SnackNotificationService,
  ) {
    this.formGroup = this.fb.group({
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      verifyPassword: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit(): void {
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
      if (this.formGroup.get('password').value === this.formGroup.get('verifyPassword').value) {
        this.store.dispatch(userEditPasswordRequest({ id: this.data.id, password: this.formGroup.getRawValue() }));
        this.dialogRef.close(true);
      } else {
        this.notification.showNotification('¡Las contraseñas no coinciden!', 'error')
      }
    }
  }

}
