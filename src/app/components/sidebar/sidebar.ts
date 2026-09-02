import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../model/nav-item';
import { HamburgerComponent } from '../hamburger-component/hamburger-component';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    MatButtonModule,
    HamburgerComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  mode: MatDrawerMode = 'side';
  @Input() navItems: NavItem[] = [];
  @Input() showLogoutOption = false;
  @Output() logoutClicked = new EventEmitter<void>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.mode = result.matches ? 'over' : 'side';
    });
  }

  onLogoutClick() {
    this.logoutClicked.emit();
  }
}
