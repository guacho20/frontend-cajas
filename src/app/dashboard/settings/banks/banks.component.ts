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
import { Bank } from 'src/app/models/settings';
import { bankDeleteRequest, banksRequest } from 'src/app/reducers/settings/actions';
import { BankDialogComponent } from './bank-dialog/bank-dialog.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['detail', 'code', 'abbr', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  banksData: MatTableDataSource<Bank> = new MatTableDataSource();
  banksSub: Subscription;

  actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.banksSub = this.store.select(state => state.settings.banks).pipe(
      filter(data => data.length > 0),
      map(data => this.banksData.data = data)
    ).subscribe();

    this.actionSub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.bankCreateSuccess,
        SettingsActionTypes.bankEditSuccess,
        SettingsActionTypes.bankDeleteSuccess,
      ),
      map(() => this.store.dispatch(banksRequest()))
    ).subscribe()
  }

  ngOnInit(): void {
    this.banksData.paginator = this.paginator;
    this.banksData.sort = this.sort;
  }

  ngOnDestroy() {
    this.banksSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(BankDialogComponent, {
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
    const data = this.banksData.data.find(item => item.id === id);
    const dialogRef = this.dialog.open(BankDialogComponent, {
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
    this.store.dispatch(bankDeleteRequest({ id: id }));
  }

}
