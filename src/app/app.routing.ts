import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { CreateContactComponent } from './components/admin/create-contact/create-contact.component';
import { ListContactsComponent } from './components/admin/list-contacts/list-contacts.component';
import { EditContactComponent } from './components/admin/edit-contact/edit-contact.component';

//mapemento das rotas do módulo
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'account/login' },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/forgot-password', component: ForgotPasswordComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/create-contact', component: CreateContactComponent, canActivate: [AdminGuard] },
  { path: 'admin/list-contacts', component: ListContactsComponent, canActivate: [AdminGuard] },
  { path: 'admin/edit-contact/:id', component: EditContactComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
