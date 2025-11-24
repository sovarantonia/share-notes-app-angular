import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { LandingPage } from './landing-page/landing-page';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { AuthGuard } from './service/auth/auth-guard';

export const routes: Routes = [
  { path: '', component: LandingPage, title: 'Share notes app' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'home', component: HomePage, canActivate: [AuthGuard], title: 'Home' },
];
