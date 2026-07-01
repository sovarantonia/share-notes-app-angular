import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { DatePicker, DateRangeSelection } from '../components/date-picker/date-picker';
import { GradeChart } from '../components/grade-chart/grade-chart';
import { NotesCard } from '../components/notes-card/notes-card';
import { GradeSummary } from '../model/note/grade-summary';
import { NoteResponse } from '../model/note/note-response';
import { NoteService } from '../service/note/note-service';
import { UserService } from '../service/user/user-service';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe, GradeChart, MatDatepickerModule, DatePicker, NotesCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true,
})
export class HomePage implements OnInit {
  latestNotes$!: Observable<NoteResponse[]>;
  gradeSummary$!: Observable<GradeSummary[]>;
  // currentUserId!: number;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.latestNotes$ = this.noteService.getLatestNotes();
  }

  onDateRangeChanged(range: DateRangeSelection) {
    if (range.startDate && range.endDate) {
      this.gradeSummary$ = this.noteService.getAverageGradesBetweenDates(
        range.startDate,
        range.endDate
      );
    }
  }
}
