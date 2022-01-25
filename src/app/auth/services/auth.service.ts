import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthDataInput,
  CurrentUserData,
  UserCredentialsInput
} from '../interfaces';
import { environment } from '@env/environment';
import { toFormData } from '@app/core/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public loginUser(
    bodyParams: UserCredentialsInput
  ): Observable<AuthDataInput> {
    const url = environment.baseApiUrl + '/authentication/login';

    return this.http.post<AuthDataInput>(url, bodyParams);
  }

  public registerUser(
    bodyParams: UserCredentialsInput,
    profilePicture: File | null
  ): Observable<AuthDataInput> {
    const payload = {
      email: bodyParams.email,
      password: bodyParams.password,
      fullname: bodyParams.fullname,
      profile_picture: profilePicture
    };

    const url = environment.baseApiUrl + '/authentication/register';

    return this.http.post<AuthDataInput>(url, toFormData(payload));
  }

  public getAuthDetails(): AuthDataInput {
    return JSON.parse(sessionStorage.getItem('authCredentials'));
  }

  public getCurrentUser(): Observable<CurrentUserData> {
    const url = environment.baseApiUrl + '/authentication/currentUser';

    return this.http.get<CurrentUserData>(url);
  }
}
