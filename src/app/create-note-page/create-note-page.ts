import { Component, OnInit, signal } from '@angular/core';
import { NoteForm } from '../components/note-form/note-form';
import { SnackbarService } from '../components/notification/snackbar-service';
import { NoteRequest } from '../model/note/note-request';
import { NoteService } from '../service/note/note-service';
import { TagService } from '../service/tag/tag-service';

@Component({
  selector: 'app-create-note-page',
  imports: [NoteForm],
  templateUrl: './create-note-page.html',
  styleUrl: './create-note-page.css',
})
export class CreateNotePage implements OnInit {
  readonly formTitle = 'Create note';
  allTags = signal<string[]>([]);

  constructor(
    private noteService: NoteService,
    private tagService: TagService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  private loadTags(): void {
    this.tagService.getTagsForUser().subscribe({
      next: (tags) => {
        this.allTags.set(tags.map((t) => t.name));
      },
    });
  }

  createNote(note: NoteRequest) {
    this.noteService.createNote(note).subscribe({
      next: () => {
        this.snackbarService.open('Note was created');
        this.loadTags();
      },
      error: () => {
        this.snackbarService.open('Could not add the note');
      },
    });
  }
}
