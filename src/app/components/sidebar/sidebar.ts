import { Component, Input } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HamburgerComponent } from '../hamburger-component/hamburger-component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavItem } from '../../model/nav-item';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    HamburgerComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  mode: MatDrawerMode = 'over';
  @Input() navItems: NavItem[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.mode = result.matches ? 'over' : 'side';
    });
  }
}
