import { Component } from '@angular/core';
import { SnackbarService } from '../components/notification/snackbar-service';
import { NoteRequest } from '../model/note/note-request';
import { NoteForm } from '../note-form/note-form';
import { NoteService } from '../service/note/note-service';

@Component({
  selector: 'app-create-note-page',
  imports: [NoteForm],
  templateUrl: './create-note-page.html',
  styleUrl: './create-note-page.css',
})
export class CreateNotePage {
  readonly formTitle = 'Create note';

  constructor(
    private noteService: NoteService,
    private snackbarService: SnackbarService
  ) {}

  createNote(note: NoteRequest) {
    this.noteService.createNote(note).subscribe({
      next: () => {
        this.snackbarService.open('Note was created');
      },
      error: () => {
        this.snackbarService.open('Could not add the note');
      },
    });
  }
}
