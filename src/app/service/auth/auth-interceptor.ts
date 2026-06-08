import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth-service';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
      return next.handle(req);
    }

    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    }

    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status == 400) {
          this.authService.logout();
        }

        return throwError(() => err);
      })
    );
  }
}
