import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '.';
import { AuthDataInput, CurrentUserData, UserCredentialsInput } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService implements OnDestroy {
  private isAuthenticated$$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticated$$.asObservable();

  private currentUser$$ = new BehaviorSubject<CurrentUserData>(null);
  public currentUser$: Observable<CurrentUserData> =
    this.currentUser$$.asObservable();

  private profilePicture$$ = new BehaviorSubject<string>(
    'assets/images/default-user.png'
  );
  public profilePicture$: Observable<string> =
    this.profilePicture$$.asObservable();

  private errorMessage$$ = new BehaviorSubject<string>(null);
  public errorMessage$: Observable<string> = this.errorMessage$$.asObservable();

  public currentPictureFile: File = null;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getAuthDetails()) {
      this.isAuthenticated$$.next(true);
      // this.loadCurrentUser();
    }
    console.log('aloooooooo');
  }

  public loadLoginUser(bodyParams: UserCredentialsInput): void {
    this.authService
      .loginUser(bodyParams)
      .pipe(take(1))
      .subscribe((value: AuthDataInput) => {
        sessionStorage.setItem('authCredentials', JSON.stringify(value));
        this.isAuthenticated$$.next(true);
        this.loadCurrentUser();
        this.router.navigate(['/calendar']);
      });
  }

  public loadRegisterUser(bodyParams: UserCredentialsInput): void {
    this.authService
      .registerUser(bodyParams)
      .pipe(take(1))
      .subscribe((value: AuthDataInput) => {
        sessionStorage.setItem('authCredentials', JSON.stringify(value));
        this.isAuthenticated$$.next(true);
        this.loadCurrentUser();
        this.router.navigate(['/calendar']);
      });
  }

  public loadCurrentUser(): void {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((value: CurrentUserData) => {
        console.log(value);
        value.profile_picture =
          'https://res.cloudinary.com/dhavld11j/' + value.profile_picture;
        this.currentUser$$.next(value);
        this.isAuthenticated$$.next(true);
      });
  }

  public logoutUser(): void {
    sessionStorage.removeItem('authCredentials');
  }

  public getAuthDetails(): AuthDataInput {
    return this.authService.getAuthDetails();
  }

  public loadProfilePicture(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.currentPictureFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture$$.next(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  public setErrorMessage(message: string): void {
    this.errorMessage$$.next(message);
  }

  public ngOnDestroy(): void {
    this.currentUser$$.next(null);
    this.currentUser$$.complete();
    this.isAuthenticated$$.next(null);
    this.isAuthenticated$$.complete();
    this.profilePicture$$.next(null);
    this.profilePicture$$.complete();
    this.errorMessage$$.next(null);
    this.errorMessage$$.complete();
  }
}
