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
      icon: 'home'
    },
    {
      route: '/app/profile',
      label: 'Profile',
      icon: 'person'
    },
    {
      route: '/app/add-note',
      label: 'Create new note',
      icon: 'note_add'
    },
    {
      route: '/app/my-notes',
      label: 'My notes',
      icon: 'description'
    },
    {
      route: '/app/friends',
      label: 'Friend list',
      icon: 'group'
    },
    {
      route: '/app/shares',
      label: 'Shared notes',
      icon: 'share'
    },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
