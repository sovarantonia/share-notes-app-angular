import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { GradeSummary } from '../../model/note/grade-summary';
import { NoteRequest } from '../../model/note/note-request';
import { NoteResponse } from '../../model/note/note-response';
import { NoteSearchFilters } from '../../model/note/note-search-filters';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly baseUrl = `${environment.baseUrl}/notes`;
  private http: HttpClient = inject(HttpClient);

  getById(id: string): Observable<NoteResponse> {
    return this.http.get<NoteResponse>(`${this.baseUrl}/${id}`);
  }

  createNote(noteRequest: NoteRequest): Observable<NoteResponse> {
    return this.http.post<NoteResponse>(this.baseUrl, noteRequest);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  update(id: string, noteRequest: NoteRequest): Observable<NoteResponse> {
    return this.http.patch<NoteResponse>(`${this.baseUrl}/${id}`, noteRequest);
  }

  getAllByUser(): Observable<NoteResponse[]> {
    return this.http.get<NoteResponse[]>(this.baseUrl);
  }

  searchNotes(noteSearchFilters: NoteSearchFilters): Observable<NoteResponse[]> {
    let params = new HttpParams();
    if (noteSearchFilters.title) {
      params = params.set('title', noteSearchFilters.title);
    }

    if (noteSearchFilters.tag) {
      params = params.set('tag', noteSearchFilters.tag);
    }

    if (noteSearchFilters.grade !== undefined) {
      params = params.set('grade', noteSearchFilters.grade);
    }

    if (noteSearchFilters.from) {
      params = params.set('from', noteSearchFilters.from);
    }

    if (noteSearchFilters.to) {
      params = params.set('to', noteSearchFilters.to);
    }

    return this.http.get<NoteResponse[]>(`${this.baseUrl}/search`, { params: params });
  }

  getLatestNotes(): Observable<NoteResponse[]> {
    return this.http.get<NoteResponse[]>(`${this.baseUrl}/latest`);
  }

  getAverageGradesBetweenDates(startDate: string, endDate: string): Observable<GradeSummary[]> {
    let params = new HttpParams();
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);

    return this.http.get<GradeSummary[]>(`${this.baseUrl}/dates`, { params: params });
  }

  downloadNotes(ids: number[], type: 'txt' | 'pdf' | 'docx') {
    let params = new HttpParams().set('type', type);

    ids.forEach((id) => {
      params = params.append('ids', id);
    });

    return this.http.get(`${this.baseUrl}/download`, {params: params, responseType: 'blob'});
  }
}
