import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserLoginRequest } from '../../model/user/user-login-request';
import { UserLoginResponse } from '../../model/user/user-login-response';
import { UserRequest } from '../../model/user/user-request';
import { UserResponse } from '../../model/user/user-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  private readonly TOKEN_KEY = 'tokenValue';
  private readonly http: HttpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  login(userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.baseUrl}/login`, userLoginRequest).pipe(
      tap((res) => {
        this.setToken(res.tokenValue);
      })
    );
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('tokenValue', token);
    }
  }

  register(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, userRequest);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
