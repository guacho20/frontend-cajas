import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ofType, Actions } from '@ngrx/effects';

import { SettingsActionTypes } from 'src/app/reducers/settings/types';
import { Province } from 'src/app/models/settings';
import { State } from 'src/app/reducers';
import { provinceEditRequest, provinceCreateRequest } from 'src/app/reducers/settings/actions';

@Component({
  selector: 'app-province-dialog',
  templateUrl: './province-dialog.component.html',
  styleUrls: ['./province-dialog.component.scss']
})
export class ProvinceDialogComponent implements OnInit {
  formGroup: FormGroup;

  proSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ProvinceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Province,
    private fb: FormBuilder,
    private store: Store<State>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.fb.control(this.data && this.data.id ? this.data.id : 0),
      detail: this.fb.control(this.data && this.data.detail ? this.data.detail : '', [Validators.required]),
    });
    this.proSub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.provinceCreateSuccess,
        SettingsActionTypes.provinceEditSuccess
      ),
      map(() => this.dialogRef.close(true))
    ).subscribe();
  }

  ngOnDestroy() {
    this.proSub.unsubscribe();
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

      const proValues = this.formGroup.getRawValue();
      if (proValues && proValues.id !== 0) {
        this.store.dispatch(provinceEditRequest({ province: proValues }));
      } else {
        this.store.dispatch(provinceCreateRequest({ province: proValues }));
      }
    }
  }
}
