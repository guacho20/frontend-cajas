import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ofType, Actions } from '@ngrx/effects';

import { SettingsActionTypes } from 'src/app/reducers/settings/types';
import { State } from 'src/app/reducers';
import { BusinessType } from 'src/app/models/settings';
import { businessEditRequest, businessCreateRequest } from 'src/app/reducers/settings/actions';

@Component({
  selector: 'app-bs-types-dialog',
  templateUrl: './bs-types-dialog.component.html',
  styleUrls: ['./bs-types-dialog.component.scss']
})
export class BsTypesDialogComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  sub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<BsTypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BusinessType,
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
        SettingsActionTypes.businessTypeCreateSuccess,
        SettingsActionTypes.businessTypeEditSuccess
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
        this.store.dispatch(businessEditRequest({ business_type: values }));
      } else {
        this.store.dispatch(businessCreateRequest({ business_type: values }));
      }
    }
  }
}
