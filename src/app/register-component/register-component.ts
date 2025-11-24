import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Card } from '../card/card';
import { UserRegister } from '../model/register/user-register';
import { RegisterForm } from '../register-form/register-form';
import { AuthService } from '../service/auth/auth-service';

@Component({
  selector: 'app-register-component',
  imports: [Card, RegisterForm, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
  standalone: true,
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  async onHandleFormData(user: UserRegister) {
    try {
      const res = await this.authService.register(user);
      alert('register successful'); //placeholder for now
      this.router.navigateByUrl('/login');
    } catch (err) {
      alert('Some error occured');
    }
  }
}
