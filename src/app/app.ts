import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthCard } from './auth-card/auth-card';
import { LoginForm } from "./login-form/login-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthCard, LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('application');
}
