import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { NoteRequest } from '../../model/note/note-request';
import { NoteResponse } from '../../model/note/note-response';
import { ViewNoteDialog } from '../view-note-dialog/view-note-dialog';
@Component({
  selector: 'app-notes-card',
  imports: [MatCardModule, MatChip, MatFormFieldModule, MatAnchor, DatePipe, MatIcon],
  templateUrl: './notes-card.html',
  styleUrl: './notes-card.css',
})
export class NotesCard {
  @Input() note!: NoteResponse;
  @Input() isViewMode = false;
  @Input() isReadonlyMode = false;

  @Output() noteUpdated = new EventEmitter<{ id: number; data: NoteRequest }>();
  @Output() noteDeleted = new EventEmitter<number>();

  readonly dialog = inject(MatDialog);

  onViewClick(id: number, note: NoteResponse) {
    const dialogRef = this.dialog.open(ViewNoteDialog, {
      data: { note: note, isReadonlyMode: this.isReadonlyMode },
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

  onDeleteClick(id: number) {
    this.noteDeleted.emit(id);
  }
}
