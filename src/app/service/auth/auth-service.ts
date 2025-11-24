import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserLogin } from '../../model/login/user-login';
import { UserRegister } from '../../model/register/user-register';
import { User } from '../../model/user/user';
import { UserLoginResponse } from '../../model/user/user-login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080';
  private readonly TOKEN_KEY = 'tokenValue';
  private readonly http: HttpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  async login(user: UserLogin): Promise<UserLoginResponse> {
    const res = await firstValueFrom(
      this.http.post<UserLoginResponse>(`${this.baseUrl}/login`, user)
    );

    sessionStorage.setItem(this.TOKEN_KEY, res.tokenValue);

    return res;
  }

  async register(user: UserRegister): Promise<User> {
    return await firstValueFrom(this.http.post<User>(`${this.baseUrl}/register`, user));
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
