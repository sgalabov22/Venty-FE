import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthFacadeService } from '.';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authFacadeService: AuthFacadeService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { access_token } = this.authFacadeService.getAuthDetails();
    const urlNeedsHeader = !request.url.includes('authentication');

    if (access_token && urlNeedsHeader) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
