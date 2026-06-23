import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dialog } from '../components/dialog/dialog';
import { SnackbarService } from '../components/notification/snackbar-service';
import { DialogData } from '../model/dialog-data';
import { UserName } from '../model/user/user-name';
import { AuthService } from '../service/auth/auth-service';
import { UserService } from '../service/user/user-service';

@Component({
  selector: 'app-profile-page',
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  readonly dialog = inject(MatDialog);

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
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
        this.snackbarService.open('Could not update user info');
      },
    });
  }

  onDeleteClicked() {
    const data: DialogData = {
      title: 'Delete account',
      content: 'This action can not be undone.',
      actionName: 'Delete',
      dialogCloseActionName: 'Cancel'
    };

    const ref = this.dialog.open(Dialog, {
      data,
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.userService.deleteUser().subscribe({
          next: () => {
            this.authService.logout();
            this.router.navigate(['/login']);
          },
          error: () => {
            this.snackbarService.open('Could not delete the account');
          }
        });
      }
    });
  }
}
