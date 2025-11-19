import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLogin } from '../model/login/user-login';
@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  @Output() public handleFormData = new EventEmitter<UserLogin>();

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    let loginInfo: UserLogin = this.loginForm.value as UserLogin;
    
    this.handleFormData.emit(loginInfo);
    this.loginForm.reset();
  }
}
