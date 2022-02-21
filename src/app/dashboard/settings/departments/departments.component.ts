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
import { Department } from 'src/app/models/settings';
import { departmentsRequest, departmentDeleteRequest } from 'src/app/reducers/settings/actions';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'name_base', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  matData: MatTableDataSource<Department> = new MatTableDataSource();
  dataSub: Subscription;

  actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.dataSub = this.store.select(state => state.settings.departments).pipe(
      filter(data => data.length > 0),
      map(data => this.matData.data = data)
    ).subscribe();

    this.actionSub = this.actions$.pipe(
      ofType(
        SettingsActionTypes.departmentCreateSuccess,
        SettingsActionTypes.departmentEditSuccess,
        SettingsActionTypes.departmentDeleteSuccess,
      ),
      map(() => this.store.dispatch(departmentsRequest()))
    ).subscribe()
  }

  ngOnInit(): void {
    this.matData.paginator = this.paginator;
    this.matData.sort = this.sort;
    this.store.dispatch(departmentsRequest());
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
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
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
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
    this.store.dispatch(departmentDeleteRequest({ id: id }));
  }
}
