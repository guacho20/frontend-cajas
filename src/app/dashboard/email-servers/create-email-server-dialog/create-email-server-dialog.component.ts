import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ofType, Actions } from '@ngrx/effects';

import { EmailServer } from 'src/app/models/core';
import { State } from 'src/app/reducers';
import { CoreActionTypes } from 'src/app/reducers/core/types';
import { map } from 'rxjs/operators';
import { emailEditRequest, emailCreateRequest } from 'src/app/reducers/core/actions';

@Component({
  selector: 'app-create-email-server-dialog',
  templateUrl: './create-email-server-dialog.component.html',
  styleUrls: ['./create-email-server-dialog.component.scss']
})
export class CreateEmailServerDialogComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  emailSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<CreateEmailServerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailServer,
    private fb: FormBuilder,
    private store: Store<State>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.fb.control(this.data && this.data.id ? this.data.id : 0),
      user: this.fb.control(this.data && this.data.user ? this.data.user : '', [Validators.required]),
      email: this.fb.control(this.data && this.data.email ? this.data.email : '', [Validators.required]),
      password: this.fb.control(this.data && this.data.password ? this.data.password : '', [Validators.required]),
      smtp_address: this.fb.control(this.data && this.data.smtp_address ? this.data.smtp_address : '', [Validators.required]),
      port: this.fb.control(this.data && this.data.port ? this.data.port : '', [Validators.required]),
    });
    this.emailSub = this.actions$.pipe(
      ofType(
        CoreActionTypes.emailCreateSuccess,
        CoreActionTypes.emailEditSuccess
      ),
      map(() => this.dialogRef.close(true))
    ).subscribe();
  }

  ngOnDestroy() {
    this.emailSub.unsubscribe();
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

      const emailValues = this.formGroup.getRawValue();
      if (emailValues && emailValues.id !== 0) {
        this.store.dispatch(emailEditRequest({ email: emailValues }));
      } else {
        this.store.dispatch(emailCreateRequest({ email: emailValues }));
      }
    }
  }
}
