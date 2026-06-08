import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { LandingPage } from './landing-page/landing-page';

import { AuthGuard } from './service/auth/auth-guard';
import { RegisterPage } from './register-page/register-page';
import { LoginPage } from './login-page/login-page';

export const routes: Routes = [
  { path: '', component: LandingPage, title: 'Share notes app' },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [{ path: 'home', component: HomePage, title: 'Home' }],
  },
  { path: 'login', component: LoginPage, title: 'Login' },
  { path: 'register', component: RegisterPage, title: 'Register' },
];
