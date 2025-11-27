import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRegister } from '../model/register/user-register';
import { EmailExistsValidator } from '../validator/email-exists-validator';
import { confirmPasswordValidator } from '../validator/password-validator';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  standalone: true,
})
export class RegisterForm implements OnInit {
  public registerForm;

  constructor(
    private emailExistsValidator: EmailExistsValidator,
    private fb: FormBuilder
  ) {
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

  @Output() public handleFormData = new EventEmitter<UserRegister>();

  ngOnInit(): void {}

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    let registerInfo: UserRegister = this.registerForm.value as UserRegister;

    this.handleFormData.emit(registerInfo);
  }
}
