import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthToken, Login } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'platform'
})
export class AuthService {
  readonly #httpClient = inject(HttpClient)

  login(body: Login): Observable<AuthToken> {
    return this.#httpClient.post<AuthToken>(`/users/login`, body)
  }
}
