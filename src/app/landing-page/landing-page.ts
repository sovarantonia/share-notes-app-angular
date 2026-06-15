import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar } from "../components/sidebar/sidebar";
@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, Sidebar, RouterOutlet],
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
