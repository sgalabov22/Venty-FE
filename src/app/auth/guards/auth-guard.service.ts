import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthFacadeService } from '..';

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
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
