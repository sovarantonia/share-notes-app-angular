import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { LandingPage } from './landing-page/landing-page';
import { LoginComponent } from './login-component/login-component';
import { AuthGuard } from './service/auth/auth-guard';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePage, canActivate: [AuthGuard] },
];
