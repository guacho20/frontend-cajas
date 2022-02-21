import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';


import { EmailServer } from 'src/app/models/core';
import { emailSRequest, emailDeleteRequest } from 'src/app/reducers/core/actions';
import { CoreActionTypes } from 'src/app/reducers/core/types';
import { CreateEmailServerDialogComponent } from './create-email-server-dialog/create-email-server-dialog.component';

@Component({
  selector: 'app-email-servers',
  templateUrl: './email-servers.component.html',
  styleUrls: ['./email-servers.component.scss']
})
export class EmailServersComponent implements OnInit {
  displayedColumns: string[] = ['user', 'email', 'password', 'smtp_address', 'port', 'actions'];

  emailsData: MatTableDataSource<EmailServer> = new MatTableDataSource();
  emailsSub: Subscription;
  actionsSub: Subscription;

  // actionSub: Subscription;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private actions$: Actions
  ) {
    this.emailsSub = this.store.select(state => state.core.email_servers).pipe(
      map(email_servers => this.emailsData.data = email_servers)
    ).subscribe();

    this.actionsSub = this.actions$.pipe(
      ofType(
        CoreActionTypes.emailCreateSuccess,
        CoreActionTypes.emailDeleteSuccess,
        CoreActionTypes.emailEditSuccess,
      ),
      map(() => this.store.dispatch(emailSRequest()))
    ).subscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(emailSRequest());
  }

  ngOnDestroy() {
    this.emailsSub.unsubscribe();
    this.actionsSub.unsubscribe();
  }

  createEmail(): void {
    const dialogRef = this.dialog.open(CreateEmailServerDialogComponent, {
      width: '300px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  openEmail(id: number): void {
    const emailS = this.emailsData.data.find(item => item.id === id);
    const dialogRef = this.dialog.open(CreateEmailServerDialogComponent, {
      width: '300px',
      height: 'auto',
      data: emailS
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.store.dispatch(usersRequest());
      }
    });
  }

  onDelete(id: number) {
    this.store.dispatch(emailDeleteRequest({ id: id }));
  }

}
