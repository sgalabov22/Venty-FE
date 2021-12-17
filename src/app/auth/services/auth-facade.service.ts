import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '.';
import { AuthDataInput, UserCredentialsInput } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService implements OnDestroy {
  private authDetails$$ = new BehaviorSubject<AuthDataInput>(null);
  public authDetails$: Observable<AuthDataInput> =
    this.authDetails$$.asObservable();

  private isAuthenticated$$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticated$$.asObservable();

  private currentUser$$ = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUser$$.asObservable();

  constructor(private authService: AuthService) {
    if (this.getAuthDetails()) {
      this.isAuthenticated$$.next(true);
    }
  }

  public loadLoginUser(bodyParams: UserCredentialsInput): void {
    console.log(bodyParams);
    this.authService
      .loginUser(bodyParams)
      .pipe(take(1))
      .subscribe((value: AuthDataInput) => {
        console.log(value);
        this.authDetails$$.next(value);
        sessionStorage.setItem('authCredentials', JSON.stringify(value));
        this.isAuthenticated$$.next(true);
      });
  }

  public loadRegisterUser(bodyParams: UserCredentialsInput): void {
    this.authService
      .registerUser(bodyParams)
      .pipe(take(1))
      .subscribe((value: AuthDataInput) => {
        console.log(value);
        this.authDetails$$.next(value);
        sessionStorage.setItem('authCredentials', JSON.stringify(value));
        this.isAuthenticated$$.next(true);
      });
  }

  public logoutUser(): void {
    sessionStorage.removeItem('authCredentials');
  }

  public getAuthDetails(): AuthDataInput {
    console.log(JSON.parse(sessionStorage.getItem('authCredentials')));
    return JSON.parse(sessionStorage.getItem('authCredentials'));
  }

  public ngOnDestroy(): void {
    this.authDetails$$.next(null);
    this.currentUser$$.next(null);
    this.isAuthenticated$$.next(null);
  }
}
