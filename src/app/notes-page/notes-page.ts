import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotesCard } from '../components/notes-card/notes-card';
import { SnackbarService } from '../components/notification/snackbar-service';
import { NoteRequest } from '../model/note/note-request';
import { NoteResponse } from '../model/note/note-response';
import { NoteService } from '../service/note/note-service';

@Component({
  selector: 'app-notes-page',
  imports: [NotesCard],
  templateUrl: './notes-page.html',
  styleUrl: './notes-page.css',
})
export class NotesPage implements OnInit {
  allNotes$!: Observable<NoteResponse[]>;

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
}
