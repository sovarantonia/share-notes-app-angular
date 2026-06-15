import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ShareResponse } from '../../model/share/share-response';

@Injectable({ providedIn: 'root' })
export class ShareService {
  private readonly baseUrl = `${environment.baseUrl}/share`;
  private http: HttpClient = inject(HttpClient);

  shareNote(noteId: string, receiverEmail: string): Observable<ShareResponse> {
    const params = new HttpParams().set('receiverEmail', receiverEmail);

    return this.http.post<ShareResponse>(`${this.baseUrl}/${noteId}`, null, { params: params });
  }

  getById(id: string): Observable<ShareResponse> {
    return this.http.get<ShareResponse>(`${this.baseUrl}/${id}`);
  }

  getSharedNotesWithUsers(receiverEmail?: string): Observable<ShareResponse[]> {
    let params = new HttpParams();
    if (receiverEmail) {
      params.set('receiverEmail', receiverEmail);
    }

    return this.http.get<ShareResponse[]>(`${this.baseUrl}/sent`, { params: params });
  }

  getReceivedNotesFromUsers(senderEmail?: string): Observable<ShareResponse[]> {
    let params = new HttpParams();
    if (senderEmail) {
      params.set('receiverEmail', senderEmail);
    }

    return this.http.get<ShareResponse[]>(`${this.baseUrl}/received`, { params: params });
  }
}
