import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    console.log('Data: ', this.loginForm.value.email);
  }
}
