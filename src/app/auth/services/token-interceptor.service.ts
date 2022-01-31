import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthFacadeService } from '.';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const noHeader =
      request.url.includes('register') || request.url.includes('login');

    if (!noHeader) {
      const access_token = this.authFacadeService.getAuthDetails().access_token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status === 400) {
          console.log(error);
          this.authFacadeService.setErrorMessage(error.error.error[0]);
        }

        this.messageService.add({
          severity: 'error',
          summary: `Error: ${error.status}`,
          detail: error.message
        });
        return throwError(error);
      })
    );
  }
}
