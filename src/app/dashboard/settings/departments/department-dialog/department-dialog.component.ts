import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ofType, Actions } from '@ngrx/effects';

import { SettingsActionTypes } from 'src/app/reducers/settings/types';
import { State } from 'src/app/reducers';
import { Department } from 'src/app/models/settings';
import { departmentEditRequest, departmentCreateRequest } from 'src/app/reducers/settings/actions';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss']
})
export class DepartmentDialogComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  sub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department,
    private fb: FormBuilder,
    private store: Store<State>,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.fb.control(this.data && this.data.id ? this.data.id : 0),
      name: this.fb.control(this.data && this.data.name ? this.data.name : '', [Validators.required]),
      name_base: this.fb.control(this.data && this.data.name_base ? this.data.name_base : '', [Validators.required]),
    });
    this.sub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.departmentCreateSuccess,
        SettingsActionTypes.departmentEditSuccess
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
        this.store.dispatch(departmentEditRequest({ department: values }));
      } else {
        this.store.dispatch(departmentCreateRequest({ department: values }));
      }
    }
  }
}
