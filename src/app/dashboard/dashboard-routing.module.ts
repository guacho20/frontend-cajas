import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuditAccessComponent } from './audit-access/audit-access.component';
import { EmailServersComponent } from './email-servers/email-servers.component';
import { SettingsComponent } from './settings/settings.component';
import { CommercialManagementComponent } from './commercial-management/commercial-management.component';
import { ChargesComponent } from './charges/charges.component';
import { PaymentsComponent } from './payments/payments.component';
import { ConsultsComponent } from './consults/consults.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent,
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UserManagementComponent,
  },
  {
    path: 'audit',
    children: [
      {
        path: 'access',
        component: AuditAccessComponent
      }
    ]
  },
  {
    path: 'emails',
    component: EmailServersComponent
  },
  {
    path: 'commercial',
    component: CommercialManagementComponent
  },
  {
    path: 'charges',
    component: ChargesComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'consults',
    component: ConsultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
