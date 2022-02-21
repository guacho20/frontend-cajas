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
import { PaymentMethod } from 'src/app/models/settings';
import { payMethodsRequest, payMethodDeleteRequest } from 'src/app/reducers/settings/actions';
import { PaymentsDialogComponent } from '../../payments/payments-dialog/payments-dialog.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['detail', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  matData: MatTableDataSource<PaymentMethod> = new MatTableDataSource();
  dataSub: Subscription;

  actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.dataSub = this.store.select(state => state.settings.pms).pipe(
      filter(data => data.length > 0),
      map(data => this.matData.data = data)
    ).subscribe();

    this.actionSub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.payMethodCreateSuccess,
        SettingsActionTypes.payMethodEditSuccess,
        SettingsActionTypes.payMethodDeleteSuccess,
      ),
      map(() => this.store.dispatch(payMethodsRequest()))
    ).subscribe()
  }

  ngOnInit(): void {
    this.matData.paginator = this.paginator;
    this.matData.sort = this.sort;
    this.store.dispatch(payMethodsRequest());
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(PaymentsDialogComponent, {
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
    const dialogRef = this.dialog.open(PaymentsDialogComponent, {
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
    this.store.dispatch(payMethodDeleteRequest({ id: id }));
  }
}
