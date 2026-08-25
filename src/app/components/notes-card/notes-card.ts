import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, input, Input, model, Output } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChip } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { NoteRequest } from '../../model/note/note-request';
import { NoteResponse } from '../../model/note/note-response';
import { ViewNoteDialog } from '../view-note-dialog/view-note-dialog';

@Component({
  selector: 'app-notes-card',
  imports: [
    MatCardModule,
    MatChip,
    MatFormFieldModule,
    MatAnchor,
    DatePipe,
    MatIcon,
    MatCheckboxModule,
    MatSuffix,
    NgTemplateOutlet,
  ],
  templateUrl: './notes-card.html',
  styleUrl: './notes-card.css',
})
export class NotesCard {
  @Input() note!: NoteResponse;
  @Input() isViewMode = false;
  @Input() isReadonlyMode = false;
  @Input() embedded = false;

  @Output() noteUpdated = new EventEmitter<{ id: number; data: NoteRequest }>();
  @Output() noteDeleted = new EventEmitter<number>();
  @Output() noteShared = new EventEmitter<number>();

  allTags = input<string[]>([]);
  selectedNoteIds = model<number[]>([]);

  readonly dialog = inject(MatDialog);

  onViewClick(id: number, note: NoteResponse) {
    const dialogRef = this.dialog.open(ViewNoteDialog, {
      data: { note: note, isReadonlyMode: this.isReadonlyMode, tags: this.allTags() },
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

  onShareClick(id: number) {
    this.noteShared.emit(id);
  }

  onSelectionChange(id: number, checked: boolean) {
    this.selectedNoteIds.update((ids) => {
      if (checked && !ids.includes(id)) {
        return [...ids, id];
      }

      if (!checked) {
        return ids.filter((selectedId) => selectedId !== id);
      }

      return ids;
    });
  }
}
