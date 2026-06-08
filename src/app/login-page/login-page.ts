import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserLoginRequest } from '../model/user/user-login-request';
import { AuthService } from '../service/auth/auth-service';
import { SnackbarService } from '../service/notification/snackbar-service';
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.value;
    const userLoginRequest: UserLoginRequest = {
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.login(userLoginRequest).subscribe({
      next: () => {
        this.router.navigate(['/app/home']);
      },
      error: () => {
        this.snackbarService.open('Invalid email or password', 'error');
      },
    });
  }
}
