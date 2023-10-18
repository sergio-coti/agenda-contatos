import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { CreateContactComponent } from './components/admin/create-contact/create-contact.component';
import { ListContactsComponent } from './components/admin/list-contacts/list-contacts.component';
import { EditContactComponent } from './components/admin/edit-contact/edit-contact.component';
import { ChartModule } from 'angular-highcharts';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    CreateContactComponent,
    ListContactsComponent,
    EditContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ChartModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideNgxMask()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
