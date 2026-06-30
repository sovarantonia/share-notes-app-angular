import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { DialogData } from '../../model/dialog-data';
import { NoteRequest } from '../../model/note/note-request';
import { NoteResponse } from '../../model/note/note-response';
import { Dialog } from '../dialog/dialog';
import { ViewNoteDialog } from '../view-note-dialog/view-note-dialog';
@Component({
  selector: 'app-notes-card',
  imports: [MatCardModule, MatChip, MatFormFieldModule, MatAnchor, AsyncPipe, DatePipe, MatIcon],
  templateUrl: './notes-card.html',
  styleUrl: './notes-card.css',
})
export class NotesCard {
  @Input() notes$!: Observable<NoteResponse[]>;
  @Output() noteUpdated = new EventEmitter<{ id: number; data: NoteRequest }>();
  @Output() noteDeleted = new EventEmitter<number>();
  @Input() isViewMode = false;

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

  onDeleteClick(id: number) {
    const data: DialogData = {
      title: 'Delete note',
      content: 'This action can not be undone.',
      actionName: 'Delete',
      dialogCloseActionName: 'Cancel',
    };

    const dialogRef = this.dialog.open(Dialog, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.noteDeleted.emit(id);
      }
    });
  }
}
