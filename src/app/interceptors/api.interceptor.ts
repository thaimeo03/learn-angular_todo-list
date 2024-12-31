import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
  private baseUrl = 'http://localhost:9999';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${this.baseUrl}${req.url}`
    })

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = ''

        if(error.error instanceof ErrorEvent) {
          errorMessage = error.message
        } else {
          errorMessage = error.error.message
        }

        return throwError(() => errorMessage)
    }))
  }
}
