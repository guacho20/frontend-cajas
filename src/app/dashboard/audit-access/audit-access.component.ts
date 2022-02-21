import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Subscription, merge } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { State } from 'src/app/reducers';
import { AuditAccess } from 'src/app/models/audit';
import { auditAccessRequest } from 'src/app/reducers/audit/actions';

@Component({
  selector: 'app-audit-access',
  templateUrl: './audit-access.component.html',
  styleUrls: ['./audit-access.component.scss']
})
export class AuditAccessComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['action', 'user', 'audit_action', 'audit_date', 'ip'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  accessData: Array<AuditAccess> = [];
  total_count = 0;

  accessSub: Subscription;
  sortSub: Subscription;
  mergeSub: Subscription;

  constructor(
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.accessSub = this.store.select(state => state.audit.access).pipe(
      map(access => {
        console.log('Nueva data');
        this.accessData = access.items,
        this.total_count = access.total
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.accessSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.mergeSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.sortSub = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.mergeSub = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        map(() => {
          this.store.dispatch(auditAccessRequest({
            qty: this.paginator.pageSize,
            page: this.paginator.pageIndex,
            sortf: this.sort.active,
            order: this.sort.direction.toUpperCase()
          }))
        })
      )
      .subscribe();
  }

}
