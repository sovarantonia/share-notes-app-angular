import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Dialog } from '../components/dialog/dialog';
import { DownloadNoteDialog } from '../components/download-note-dialog/download-note-dialog';
import { NotesCard } from '../components/notes-card/notes-card';
import { SnackbarService } from '../components/notification/snackbar-service';
import { ShareDialog } from '../components/share-dialog/share-dialog';
import { DialogData } from '../model/dialog-data';
import { NoteRequest } from '../model/note/note-request';
import { NoteResponse } from '../model/note/note-response';
import { UserInfo } from '../model/user/user-info';
import { NoteService } from '../service/note/note-service';
import { ShareService } from '../service/share/share-service';
import { TagService } from '../service/tag/tag-service';
import { UserService } from '../service/user/user-service';
import { NoteSearchBar } from "../components/note-search-bar/note-search-bar";
import { NoteSearchFilters } from '../model/note/note-search-filters';

@Component({
  selector: 'app-notes-page',
  imports: [NotesCard, AsyncPipe, MatAnchor, NoteSearchBar],
  templateUrl: './notes-page.html',
  styleUrl: './notes-page.css',
})
export class NotesPage implements OnInit {
  allNotes$!: Observable<NoteResponse[]>;
  readonly dialog = inject(MatDialog);

  friends!: UserInfo[];

  allTags = signal<string[]>([]);

  selectedNoteIds = signal<number[]>([]);

  constructor(
    private noteService: NoteService,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private shareService: ShareService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.allNotes$ = this.noteService.getAllByUser();
    this.loadTags();
  }

  private loadTags(): void {
    this.tagService.getTagsForUser().subscribe({
      next: (tags) => {
        this.allTags.set(tags.map((t) => t.name));
      },
    });
  }

  updateNote(event: { id: number; data: NoteRequest }) {
    this.noteService.update(event.id, event.data).subscribe({
      next: () => {
        this.snackbarService.open('Note was updated');
        this.allNotes$ = this.noteService.getAllByUser();
        this.loadTags();
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

  shareNote(id: number) {
    this.userService.getFriends().subscribe({
      next: (friends) => {
        const data = friends.map((friend) => ({
          value: friend.email,
          viewValue: `${friend.firstName} ${friend.lastName} - ${friend.email}`,
        }));

        const dialogRef = this.dialog.open(ShareDialog, {
          data,
        });

        dialogRef.afterClosed().subscribe((res) => {
          if (res) {
            this.shareService.shareNote(id, res).subscribe({
              next: () => {
                this.snackbarService.open('Note was shared');
              },
              error: () => {
                this.snackbarService.open('Could not share the note');
              },
            });
          }
        });
      },
    });
  }

  downloadSelectedNotes() {
    const ids = this.selectedNoteIds();

    if (ids.length === 0) {
      return;
    }

    const dialogRef = this.dialog.open(DownloadNoteDialog);

    dialogRef.afterClosed().subscribe((type) => {
      if (!type) {
        return;
      }

      this.noteService.downloadNotes(ids, type).subscribe({
        next: (res) => {
          const blob = res.body!;

          const contentDisposition = res.headers.get('Content-Disposition');

          let filename = 'download';

          if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match) {
              filename = match[1];
            }
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          this.selectedNoteIds.set([]);
        },
        error: () => {
          this.snackbarService.open('Could not download the note(s)');
        },
      });
    });
  }

  searchNotes(noteFilters: NoteSearchFilters) {
    this.allNotes$ = this.noteService.searchNotes(noteFilters);
  }
}
