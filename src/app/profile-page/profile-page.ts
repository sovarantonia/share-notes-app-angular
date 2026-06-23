import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../components/notification/snackbar-service';
import { UserName } from '../model/user/user-name';
import { UserService } from '../service/user/user-service';

@Component({
  selector: 'app-profile-page',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      },
    });
  }

  onEditProfileSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const formValue = this.profileForm.value;
    const userName: UserName = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
    };

    this.userService.updateCredentials(userName).subscribe({
      next: () => {
        this.snackbarService.open('User info was updated');
      },
      error: () => {
        this.snackbarService.open('Could not update user info')
      }
    })
  }

  onDeleteClicked() {}
}
