import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthToken, Login } from '../models/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #httpClient = inject(HttpClient)

  private readonly ACCESS_TOKEN_KEY = 'access_token'
  private readonly REFRESH_TOKEN_KEY = 'refresh_token'

  login(body: Login): Observable<AuthToken> {
    const res = this.#httpClient.post<AuthToken>(`/users/login`, body)

    return res.pipe(
      tap(authToken => {
        this.setTokens(authToken.accessToken, authToken.refreshToken)
      })
    )
  }

  checkAuth(): boolean {
    const accessToken = this.getAccessToken()
    const refreshToken = this.getRefreshToken()

    if(!accessToken || !refreshToken) {
      return false
    }

    return true
  }

  setTokens(access_token: string, refresh_token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, access_token)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh_token)
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) ?? ''
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) ?? ''
  }
}
