import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserLogin } from '../../model/login/user-login';
import { UserLoginResponse } from '../../model/user/user-login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080';
  private readonly TOKEN_KEY = 'tokenValue';
  private readonly http: HttpClient = inject(HttpClient);

  async login(user: UserLogin): Promise<UserLoginResponse> {
    const res = await firstValueFrom(
      this.http.post<UserLoginResponse>(`${this.baseUrl}/login`, user)
    );

    sessionStorage.setItem(this.TOKEN_KEY, res.tokenValue);

    return res;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
