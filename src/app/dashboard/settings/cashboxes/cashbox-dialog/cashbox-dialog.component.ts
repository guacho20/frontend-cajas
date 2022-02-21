import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ofType, Actions } from '@ngrx/effects';

import { SettingsActionTypes } from 'src/app/reducers/settings/types';
import { State } from 'src/app/reducers';
import { CashBox } from 'src/app/models/settings';
import { cashboxEditRequest, cashboxCreateRequest } from 'src/app/reducers/settings/actions';

@Component({
  selector: 'app-cashbox-dialog',
  templateUrl: './cashbox-dialog.component.html',
  styleUrls: ['./cashbox-dialog.component.scss']
})
export class CashboxDialogComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  sub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<CashboxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CashBox,
    private fb: FormBuilder,
    private store: Store<State>,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.fb.control(this.data && this.data.id ? this.data.id : 0),
      detail: this.fb.control(this.data && this.data.detail ? this.data.detail : '', [Validators.required]),
    });
    this.sub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.cashboxCreateSuccess,
        SettingsActionTypes.cashboxEditSuccess
      ),
      map(() => this.dialogRef.close(true))
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

      const values = this.formGroup.getRawValue();
      if (values && values.id !== 0) {
        this.store.dispatch(cashboxEditRequest({ cashbox: values }));
      } else {
        this.store.dispatch(cashboxCreateRequest({ cashbox: values }));
      }
    }
  }
}
