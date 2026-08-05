import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../../model/dialog-data';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  data = inject<DialogData>(MAT_DIALOG_DATA);
}
