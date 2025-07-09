import { provideRouter, Routes, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { UserDashboardComponent } from '../UserDashboard/UserDashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user-dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin-usercreation',
    component: UserDashboardComponent,
    canActivate: [authGuard],
  }
];

export const appRouterProviders = [
  provideRouter(routes, withEnabledBlockingInitialNavigation(),
    withRouterConfig({
      onSameUrlNavigation: 'reload'
    }))
];