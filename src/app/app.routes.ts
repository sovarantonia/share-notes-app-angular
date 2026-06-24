import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { LandingPage } from './landing-page/landing-page';

import { PageLayout } from './components/page-layout/page-layout';
import { LoginPage } from './login-page/login-page';
import { ProfilePage } from './profile-page/profile-page';
import { RegisterPage } from './register-page/register-page';
import { AuthGuard } from './service/auth/auth-guard';
import { CreateNotePage } from './create-note-page/create-note-page';

export const routes: Routes = [
  { path: '', component: LandingPage, title: 'Share notes app' },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: PageLayout,
    children: [
      { path: 'home', component: HomePage, title: 'Home' },
      { path: 'profile', component: ProfilePage, title: 'My profile' },
      { path: 'add-note', component: CreateNotePage, title: 'Create a note' },
    ],
  },
  { path: 'login', component: LoginPage, title: 'Login' },
  { path: 'register', component: RegisterPage, title: 'Register' },
];
