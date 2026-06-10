import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RouterLink } from '@angular/router';
import { UserRequest } from '../model/user/user-request';
import { AuthService } from '../service/auth/auth-service';
import { SnackbarService } from '../service/notification/snackbar-service';
import { EmailExistsValidator } from '../service/validator/email-exists-validator';
import { confirmPasswordValidator } from '../service/validator/password-validator';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
  standalone: true,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private emailExistsValidator: EmailExistsValidator,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          [this.emailExistsValidator.checkEmailExists()]
        ),
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      },
      { validators: confirmPasswordValidator }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;
    const userRequest: UserRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.register(userRequest).subscribe({
      next: () => {
        this.snackbarService.open('Account was created', 'success');
      },
      error: () => {
        this.snackbarService.open('Something went wrong', 'error');
      },
    });
  }
}
