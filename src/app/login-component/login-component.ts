import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card';
import { LoginForm } from '../login-form/login-form';
import { UserLogin } from '../model/login/user-login';
import { AuthService } from '../service/auth/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [Card, LoginForm],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  standalone: true,
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {}

  async onHandleFormData(user: UserLogin) {
    try {
      const res = await this.authService.login(user);
      console.log(res.userResponse);
      alert('Logged in'); // placeholder
    }catch(err) {
      alert('Error'); //
    }
  }
}
