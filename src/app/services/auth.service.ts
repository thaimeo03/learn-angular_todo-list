import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthToken, Login } from '../models/auth';

@Injectable({
  providedIn: 'platform'
})
export class AuthService {
  readonly #httpClient = inject(HttpClient)
  readonly baseUrl = 'http://localhost:9999'

  login(body: Login) {
    return this.#httpClient.post<AuthToken>(`${this.baseUrl}/users/login`, body)
  }
}
