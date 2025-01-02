import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService)
  private router = inject(Router)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken()

    let authReq = req

    if (accessToken.length) {
      authReq = req.clone({
        setHeaders: {
          Authorization: this.getBearerToken(accessToken),
        },
      })
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((authToken) => {
              const newAuthReq = req.clone({
                setHeaders: {
                  authorization: this.getBearerToken(authToken.accessToken)
                }
              })

              return next.handle(newAuthReq)
            }),
            catchError(() => {
              this.authService.removeTokens()
              this.router.navigate(['/login'])

              return throwError(() => new Error('Unauthorized'))
            })
          )
        }

        return throwError(() => error)
      })
    )
  }

  getBearerToken(accessToken: string) {
    return `Bearer ${accessToken}`
  }
}
