import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserName } from '../../model/user/user-name';
import { UserResponse } from '../../model/user/user-response';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = `${environment.baseUrl}/user`;
  private http: HttpClient = inject(HttpClient);

  getById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/${id}`);
  }

  getByEmail(email: string): Observable<UserResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.get<UserResponse>(`${this.baseUrl}/email`, { params: params });
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/me`);
  }

  updateCredentials(user: UserName): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.baseUrl}/me`, user);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/me`);
  }

  getFriends(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/friends`);
  }

  searchUsers(searchString: string): Observable<UserResponse[]> {
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<UserResponse[]>(`${this.baseUrl}/search`, { params: params });
  }

  searchUserFriends(searchString: string): Observable<UserResponse[]> {
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<UserResponse[]>(`${this.baseUrl}/friends/search`, { params: params });
  }

  searchUserNonFriends(searchString: string): Observable<UserResponse[]> {
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get<UserResponse[]>(`${this.baseUrl}/non-friends`, { params: params });
  }
}
