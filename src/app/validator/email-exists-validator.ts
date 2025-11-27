import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class EmailExistsValidator {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  checkEmailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return of(control.value).pipe(
        debounceTime(500),
        switchMap((email) =>
          this.http
            .get(`${this.baseUrl}/user/email`, { params: { email } })
            .pipe(
              map((response) => {
                return { emailExists: true };
              }),
              catchError((err) => {
                if (err.status === 404) {
                  return of(null);
                }
                return of({ serverError: true });
              })
            )
        )
      );
    };
  }
}
