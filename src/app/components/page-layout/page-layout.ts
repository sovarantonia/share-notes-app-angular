import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth/auth-service';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-page-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.css',
})
export class PageLayout {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  sidebarNavItems = [
    {
      route: '/app/home',
      label: 'Home',
    },
    {
      route: '/app/profile',
      label: 'Profile',
    },
    {
      route: '/app/add-note',
      label: 'Create new note',
    },
    {
      route: '/app/my-notes',
      label: 'My notes',
    },
    {
      route: '/app/friends',
      label: 'Friend list',
    },
    {
      route: '/app/shares',
      label: 'Shared notes',
    },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
