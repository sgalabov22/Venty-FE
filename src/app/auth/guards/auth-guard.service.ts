import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthFacadeService, CurrentUserData } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authFacadeService: AuthFacadeService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authFacadeService.isAuthenticated$.pipe(
      map((isAuthorized: boolean) => {
        if (!isAuthorized) {
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
