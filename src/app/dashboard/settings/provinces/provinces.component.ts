import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { State } from 'src/app/reducers';

import { Province } from 'src/app/models/settings';
import { provincesRequest, provinceDeleteRequest } from 'src/app/reducers/settings/actions';
import { ProvinceDialogComponent } from './province-dialog/province-dialog.component';
import { SettingsActionTypes } from 'src/app/reducers/settings/types';
import { CitiesDialogComponent } from './cities-dialog/cities-dialog.component';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss']
})
export class ProvincesComponent implements OnInit, OnDestroy {
  displayedProvincesColumns: string[] = ['detail', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  provincesData: MatTableDataSource<Province> = new MatTableDataSource();
  provincesSub: Subscription;

  actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.provincesSub = this.store.select(state => state.settings.province).pipe(
      map(provinces => this.provincesData.data = provinces)
    ).subscribe();

    this.actionSub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.provinceCreateSuccess,
        SettingsActionTypes.provinceEditSuccess,
        SettingsActionTypes.provinceDeleteSuccess,
      ),
      map(() => this.store.dispatch(provincesRequest()))
    ).subscribe()
  }

  ngOnInit(): void {
    this.provincesData.paginator = this.paginator;
    this.provincesData.sort = this.sort;
    this.store.dispatch(provincesRequest());
  }

  ngOnDestroy() {
    this.provincesSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  createProvince(): void {
    const dialogRef = this.dialog.open(ProvinceDialogComponent, {
      width: '300px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  openProvince(id: number): void {
    const province = this.provincesData.data.find(item => item.id === id);
    const dialogRef = this.dialog.open(ProvinceDialogComponent, {
      width: '300px',
      height: 'auto',
      data: province
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  openCities(id: number): void {
    const dialogRef = this.dialog.open(CitiesDialogComponent, {
      width: '80vw',
      height: 'auto',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  onDelete(id: number) {
    this.store.dispatch(provinceDeleteRequest({ id: id }));
  }

}
