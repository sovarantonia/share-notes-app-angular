import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar } from "../components/sidebar/sidebar";
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-landing-page',
  imports: [Sidebar, RouterOutlet, RouterLink, MatCard, MatIcon, MatButton],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  standalone: true,
})
export class LandingPage {
  landingPageItems = [
    {
      route: '/login',
      label: 'Login',
    },
    {
      route: '/register',
      label: 'Register'
    }
  ];
}
