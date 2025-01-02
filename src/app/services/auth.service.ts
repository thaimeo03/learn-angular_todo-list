import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthToken, Login } from '../models/auth';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  refreshToken() {
    const refreshToken = this.getRefreshToken()

    const res = this.#httpClient.post<AuthToken>(`/auth/refresh-token`, { refreshToken })

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

    const decoded = jwtDecode(accessToken)

    if((decoded.exp as number) <= Date.now() / 1000) {
      this.refreshToken().subscribe({
        error: () => {
          this.removeTokens()
          return false
        }
      }
    )

    }

    return true
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
  }

  removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) ?? ''
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) ?? ''
  }
}
