import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoteRequest } from '../../model/note/note-request';
import { NoteResponse } from '../../model/note/note-response';
import { NoteForm } from '../../note-form/note-form';
import { NoteDialogData } from '../../model/note-dialog-data';
import { MatLabel } from "@angular/material/form-field";
import { MatChip } from "@angular/material/chips";

@Component({
  selector: 'app-view-note-dialog',
  imports: [MatDialogModule, NoteForm, MatLabel, MatChip],
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
