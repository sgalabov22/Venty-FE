import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
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
  public currentUser$: Observable<CurrentUserData> = this.currentUser$$.asObservable();

  private profilePicture$$ = new BehaviorSubject<string>('assets/images/default-user.png');
  public profilePicture$: Observable<string> = this.profilePicture$$.asObservable();

  public currentPictureFile: File = null;

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
        sessionStorage.setItem('authCredentials', JSON.stringify(value));
        this.isAuthenticated$$.next(true);
      });
  }

  public loadCurrentUser(): void {
    console.log('alo');
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((value: CurrentUserData) => {
        console.log(value);
        value.profile_picture = environment.baseApiUrl + value.profile_picture;
        this.currentUser$$.next(value);
      })
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

  public ngOnDestroy(): void {
    this.currentUser$$.next(null);
    this.currentUser$$.complete();
    this.isAuthenticated$$.next(null);
    this.isAuthenticated$$.complete();
    this.profilePicture$$.next(null);
    this.profilePicture$$.complete();
  }
}
