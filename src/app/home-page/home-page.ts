import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoteService } from '../service/note/note-service';
import { SnackbarService } from '../components/notification/snackbar-service';
import { NoteResponse } from '../model/note/note-response';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true
})
export class HomePage implements OnInit {
  latestNotes$!: Observable<NoteResponse[]>;
  constructor(private noteService: NoteService, private snackbarService: SnackbarService) {}
  ngOnInit(): void {
    this.latestNotes$ = this.noteService.getLatestNotes();
  }

}
