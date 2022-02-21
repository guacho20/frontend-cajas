import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, merge } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';


import { State } from 'src/app/reducers';
import { CommercialList, CommercialPartial } from 'src/app/models/commercial-entities';
import { commercialDeleteRequest, allCommercialsRequest } from 'src/app/reducers/commercial-entities/actions';
import { EntitiesActionTypes } from 'src/app/reducers/commercial-entities/types';
import { CommercialDialogComponent } from './commercial-dialog/commercial-dialog.component';

@Component({
  selector: 'app-commercial-management',
  templateUrl: './commercial-management.component.html',
  styleUrls: ['./commercial-management.component.scss']
})
export class CommercialManagementComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['name', 'ruc', 'email', 'owner', 'phone', 'cellphone', 'actions'];

  matData: Array<CommercialPartial> = [];
  total_count = 0;

  sub: Subscription;
  sortSub: Subscription;
  mergeSub: Subscription;

  actionsSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.sub = this.store.select(state => state.entities.all_commercials).pipe(
      map(all_commercials => {
        this.matData = all_commercials.commercials;
        this.total_count = all_commercials.total_count
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.actionsSub = this.actions$.pipe(
      ofType(
        EntitiesActionTypes.commercialCreateSuccess,
        EntitiesActionTypes.commercialEditSuccess,
        EntitiesActionTypes.commercialDeleteSuccess,
      ),
      map(() => this.store.dispatch(allCommercialsRequest({
        qty: this.paginator.pageSize,
        page: this.paginator.pageIndex,
        sortf: this.sort.active,
        order: this.sort.direction.toUpperCase()
      })))
    ).subscribe();
  }

  ngAfterViewInit() {
    this.sortSub = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.mergeSub = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        map(() => {
          this.store.dispatch(allCommercialsRequest({
            qty: this.paginator.pageSize,
            page: this.paginator.pageIndex,
            sortf: this.sort.active,
            order: this.sort.direction.toUpperCase()
          }))
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sortSub.unsubscribe();
    this.mergeSub.unsubscribe();
    this.actionsSub.unsubscribe();
  }

  onDelete(id: number) {
    this.store.dispatch(commercialDeleteRequest({ id: id }));
  }

  createCommercial(): void {
    const dialogRef = this.dialog.open(CommercialDialogComponent, {
      width: '80vw',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

}
