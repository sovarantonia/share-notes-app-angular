import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { RequestRequest } from '../../model/request/request-request';
import { RequestResponse } from '../../model/request/request-response';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private readonly baseUrl = `${environment.baseUrl}/requests`;
  private http: HttpClient = inject(HttpClient);

  sendRequest(requestRequest: RequestRequest): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(this.baseUrl, requestRequest);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  accept(id: string): Observable<RequestResponse> {
    return this.http.patch<RequestResponse>(`${this.baseUrl}/${id}/accept`, null);
  }

  decline(id: string): Observable<RequestResponse> {
    return this.http.patch<RequestResponse>(`${this.baseUrl}/${id}/decline`, null);
  }

  getSentRequests(): Observable<RequestResponse[]> {
    return this.http.get<RequestResponse[]>(`${this.baseUrl}/sent`);
  }

  getReceivedRequests(): Observable<RequestResponse[]> {
    return this.http.get<RequestResponse[]>(`${this.baseUrl}/received`);
  }

  getById(id: string): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/${id}`);
  }

  removeFromFriendList(friendId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-friend/${friendId}`);
  }
}
