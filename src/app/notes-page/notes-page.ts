import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Dialog } from '../components/dialog/dialog';
import { NotesCard } from '../components/notes-card/notes-card';
import { SnackbarService } from '../components/notification/snackbar-service';
import { DialogData } from '../model/dialog-data';
import { NoteRequest } from '../model/note/note-request';
import { NoteResponse } from '../model/note/note-response';
import { NoteService } from '../service/note/note-service';

@Component({
  selector: 'app-notes-page',
  imports: [NotesCard, AsyncPipe],
  templateUrl: './notes-page.html',
  styleUrl: './notes-page.css',
})
export class NotesPage implements OnInit {
  allNotes$!: Observable<NoteResponse[]>;
  readonly dialog = inject(MatDialog);

  constructor(
    private noteService: NoteService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.allNotes$ = this.noteService.getAllByUser();
  }

  updateNote(event: { id: number; data: NoteRequest }) {
    this.noteService.update(event.id, event.data).subscribe({
      next: () => {
        this.snackbarService.open('Note was updated');
        this.allNotes$ = this.noteService.getAllByUser();
      },
      error: () => {
        this.snackbarService.open('Could not update the note');
      },
    });
  }

  deleteNote(id: number) {
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
        this.noteService.delete(id).subscribe({
          next: () => {
            this.snackbarService.open('Note was deleted');
            this.allNotes$ = this.noteService.getAllByUser();
          },
          error: () => {
            this.snackbarService.open('Could not delete the note');
          },
        });
      }
    });
  }
}
