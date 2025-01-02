import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from "./api.interceptor";
import { AuthInterceptor } from "./auth.interceptor";
import { Provider } from "@angular/core";

export const provideInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
