import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuditAccessComponent } from './audit-access/audit-access.component';
import { UserDialogComponent } from './user-management/user-dialog/user-dialog.component';
import { PasswordRulesDialogComponent } from './user-management/password-rules-dialog/password-rules-dialog.component';
import { UserChangePasswordComponent } from './user-management/user-change-password/user-change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateDialogComponent } from './user-management/user-create-dialog/user-create-dialog.component';
import { EmailServersComponent } from './email-servers/email-servers.component';
import { CreateEmailServerDialogComponent } from './email-servers/create-email-server-dialog/create-email-server-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { ProvinceDialogComponent } from './settings/provinces/province-dialog/province-dialog.component';
import { CommercialManagementComponent } from './commercial-management/commercial-management.component';
import { ChargesComponent } from './charges/charges.component';
import { ConsultsComponent } from './consults/consults.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProvincesComponent } from './settings/provinces/provinces.component';
import { BanksComponent } from './settings/banks/banks.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { BusinessTypesComponent } from './settings/business-types/business-types.component';
import { CashboxesComponent } from './settings/cashboxes/cashboxes.component';
import { DepartmentsComponent } from './settings/departments/departments.component';
import { CitiesDialogComponent } from './settings/provinces/cities-dialog/cities-dialog.component';
import { BankDialogComponent } from './settings/banks/bank-dialog/bank-dialog.component';
import { BsTypesDialogComponent } from './settings/business-types/bs-types-dialog/bs-types-dialog.component';
import { CashboxDialogComponent } from './settings/cashboxes/cashbox-dialog/cashbox-dialog.component';
import { DepartmentDialogComponent } from './settings/departments/department-dialog/department-dialog.component';
import { PaymentMethodDialogComponent } from './settings/payment-methods/payment-method-dialog/payment-method-dialog.component';
import { AttDaysDialogComponent } from './commercial-management/commercial-view/att-days-dialog/att-days-dialog.component';
import { CommercialCashboxesDialogComponent } from './commercial-management/commercial-view/commercial-cashboxes-dialog/commercial-cashboxes-dialog.component';
import { CashiersDialogComponent } from './commercial-management/commercial-view/cashiers-dialog/cashiers-dialog.component';
import { ChargesDialogComponent } from './charges/charges-dialog/charges-dialog.component';
import { ConsultsDialogComponent } from './consults/consults-dialog/consults-dialog.component';
import { PaymentsDialogComponent } from './payments/payments-dialog/payments-dialog.component';
import { CommercialDialogComponent } from './commercial-management/commercial-dialog/commercial-dialog.component';
import { CommercialViewComponent } from './commercial-management/commercial-view/commercial-view.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserManagementComponent,
    AuditAccessComponent,
    UserDialogComponent,
    PasswordRulesDialogComponent,
    UserChangePasswordComponent,
    UserCreateDialogComponent,
    EmailServersComponent,
    CreateEmailServerDialogComponent,
    SettingsComponent,
    ProvinceDialogComponent,
    CommercialManagementComponent,
    ChargesComponent,
    ConsultsComponent,
    PaymentsComponent,
    ProvincesComponent,
    BanksComponent,
    PaymentMethodsComponent,
    BusinessTypesComponent,
    CashboxesComponent,
    DepartmentsComponent,
    CitiesDialogComponent,
    BankDialogComponent,
    BsTypesDialogComponent,
    CashboxDialogComponent,
    DepartmentDialogComponent,
    PaymentMethodDialogComponent,
    AttDaysDialogComponent,
    CommercialCashboxesDialogComponent,
    CashiersDialogComponent,
    ChargesDialogComponent,
    ConsultsDialogComponent,
    PaymentsDialogComponent,
    CommercialDialogComponent,
    CommercialViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
