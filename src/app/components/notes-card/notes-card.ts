import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { NoteRequest } from '../../model/note/note-request';
import { NoteResponse } from '../../model/note/note-response';
import { ViewNoteDialog } from '../view-note-dialog/view-note-dialog';
@Component({
  selector: 'app-notes-card',
  imports: [MatCardModule, MatChip, MatFormFieldModule, MatAnchor, AsyncPipe, DatePipe],
  templateUrl: './notes-card.html',
  styleUrl: './notes-card.css',
})
export class NotesCard {
  @Input() notes$!: Observable<NoteResponse[]>;
  @Output() noteUpdated = new EventEmitter<{ id: number; data: NoteRequest }>();

  readonly dialog = inject(MatDialog);

  onViewClick(id: number, note: NoteResponse) {
    const dialogRef = this.dialog.open(ViewNoteDialog, {
      data: note,
    });

    dialogRef.afterClosed().subscribe((res: NoteRequest | undefined) => {
      if (res) {
        this.noteUpdated.emit({
          id: id,
          data: res,
        });
      }
    });
  }
}
