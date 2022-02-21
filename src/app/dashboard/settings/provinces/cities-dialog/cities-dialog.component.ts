import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { State } from 'src/app/reducers';

import { SettingsActionTypes } from 'src/app/reducers/settings/types';
import { City, CityDto } from 'src/app/models/settings';
import { citiesRequest, cityDeleteRequest, cityEditRequest, cityCreateRequest, citiesDelete, citiesAllRequest } from 'src/app/reducers/settings/actions';

@Component({
  selector: 'app-cities-dialog',
  templateUrl: './cities-dialog.component.html',
  styleUrls: ['./cities-dialog.component.scss']
})
export class CitiesDialogComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  displayedColumns: string[] = ['detail', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  matData: MatTableDataSource<City> = new MatTableDataSource();
  dataSub: Subscription;

  actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    public dialogRef: MatDialogRef<CitiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private fb: FormBuilder,
  ) {
    this.dataSub = this.store.select(state => state.settings.cities).pipe(
      map(data => this.matData.data = data)
    ).subscribe();

    this.actionSub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.cityCreateSuccess,
        SettingsActionTypes.cityEditSuccess,
        SettingsActionTypes.cityDeleteSuccess,
      ),
      map(() => {
        this.store.dispatch(citiesRequest({ province_id: this.data.id }));
        this.store.dispatch(citiesAllRequest());
        this.formGroup.reset();
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.fb.control(0),
      province_id: this.fb.control(this.data.id, [Validators.required]),
      detail: this.fb.control('', [Validators.required]),
    });
    this.matData.paginator = this.paginator;
    this.matData.sort = this.sort;
    this.store.dispatch(citiesRequest({ province_id: this.data.id }));
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  saveCity(): void {
    if (this.formGroup.valid) {

      const cityValues = this.formGroup.getRawValue();
      if (cityValues && cityValues.id !== 0) {
        this.store.dispatch(cityEditRequest({ city: cityValues }));
      } else {
        const city: CityDto = {
          city: {
            id: cityValues.id,
            detail: cityValues.detail,
          },
          province_id: cityValues.province_id
        };
        this.store.dispatch(cityCreateRequest({ city: city }));
      }
    }
  }

  onReset() {
    this.formGroup.get('province_id').setValue(this.data.id)
  }

  editCity(id: number, detail: string): void {
    this.formGroup.get('id').setValue(id)
    this.formGroup.get('detail').setValue(detail)
  }

  onDelete(id: number) {
    this.store.dispatch(cityDeleteRequest({ id: id }));
  }

  onClose() {
    this.store.dispatch(citiesDelete());
    this.dialogRef.close(false);
  }

}
