import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

export type DownloadType = 'pdf' | 'txt' | 'docx';

@Component({
  selector: 'app-download-note-dialog',
  imports: [MatDialogModule, MatRadioModule, MatFormFieldModule, MatButton],
  templateUrl: './download-note-dialog.html',
  styleUrl: './download-note-dialog.css',
})
export class DownloadNoteDialog {
  downloadType = signal<DownloadType>('pdf');

  constructor(private dialogRef: MatDialogRef<DownloadNoteDialog, DownloadType | undefined>) {}

  download() {
    this.dialogRef.close(this.downloadType());
  }
}
