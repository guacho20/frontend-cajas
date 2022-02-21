import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';
import { AppEffects } from './effects/app.effects';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackNotificationService } from './services/snack-notification.service';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { UsersEffects } from './effects/users.effects';
import { UsersService } from './services/users.service';
import { AuditService } from './services/audit.service';
import { AuditEffects } from './effects/audit.effects';
import { CoreEffects } from './effects/core.effects';
import { CoreService } from './services/core.service';
import { SettingsEffects } from './effects/settings.effects';
import { SettingsService } from './services/settings.service';
import { GeneralEffects } from './effects/general.effects';
import { CommercialEntitiesEffects } from './effects/commercial-entities.effects';
import { GeneralService } from './services/general.service';
import { CommercialEntitiesService } from './services/commercial-entities.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([AppEffects, UsersEffects, AuditEffects, CoreEffects, SettingsEffects, GeneralEffects, CommercialEntitiesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: environment.production ? 1 : 25,
      logOnly: environment.production,
      features: {
        persist: true
      }
    }),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
    MaterialModule
  ],
  providers: [
    AuthService,
    UsersService,
    AuditService,
    CoreService,
    SettingsService,
    GeneralService,
    CommercialEntitiesService,
    SnackNotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
