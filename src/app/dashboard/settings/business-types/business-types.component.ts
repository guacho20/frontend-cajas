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

import { SettingsActionTypes } from 'src/app/reducers/settings/types';
import { BusinessType } from 'src/app/models/settings';
import { businessTypesRequest, businessDeleteRequest } from 'src/app/reducers/settings/actions';
import { BsTypesDialogComponent } from './bs-types-dialog/bs-types-dialog.component';

@Component({
  selector: 'app-business-types',
  templateUrl: './business-types.component.html',
  styleUrls: ['./business-types.component.scss']
})
export class BusinessTypesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['detail', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  matData: MatTableDataSource<BusinessType> = new MatTableDataSource();
  dataSub: Subscription;

  actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.dataSub = this.store.select(state => state.settings.business_types).pipe(
      filter(data => data.length > 0),
      map(data => this.matData.data = data)
    ).subscribe();

    this.actionSub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.businessTypeCreateSuccess,
        SettingsActionTypes.businessTypeEditSuccess,
        SettingsActionTypes.businessTypeDeleteSuccess,
      ),
      map(() => this.store.dispatch(businessTypesRequest()))
    ).subscribe()
  }

  ngOnInit(): void {
    this.matData.paginator = this.paginator;
    this.matData.sort = this.sort;
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(BsTypesDialogComponent, {
      width: '300px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  openDialog(id: number): void {
    const data = this.matData.data.find(item => item.id === id);
    const dialogRef = this.dialog.open(BsTypesDialogComponent, {
      width: '300px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  onDelete(id: number) {
    this.store.dispatch(businessDeleteRequest({ id: id }));
  }
}
