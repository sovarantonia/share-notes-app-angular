import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './card/card';
import { LoginForm } from './login-form/login-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Card, LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('application');
}
