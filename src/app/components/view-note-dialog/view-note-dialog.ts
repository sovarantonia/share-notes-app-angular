import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { NoteDialogData } from '../../model/note-dialog-data';
import { NoteRequest } from '../../model/note/note-request';
import { NoteForm } from '../note-form/note-form';

@Component({
  selector: 'app-view-note-dialog',
  imports: [MatDialogModule, NoteForm, MatLabel, MatChip, MatButton],
  templateUrl: './view-note-dialog.html',
  styleUrl: './view-note-dialog.css',
})
export class ViewNoteDialog {
  data = inject<NoteDialogData>(MAT_DIALOG_DATA);

  constructor(private dialogRef: MatDialogRef<ViewNoteDialog>) {}

  onDialogSubmit(updatedNote: NoteRequest) {
    this.dialogRef.close(updatedNote);
  }
}
