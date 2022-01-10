import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthDataInput, CurrentUserData, UserCredentialsInput } from '../interfaces';
import { environment } from '@env/environment';
import { toFormData } from '@app/core/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  public loginUser(
    bodyParams: UserCredentialsInput
  ): Observable<AuthDataInput> {
    const url = environment.baseApiUrl + '/authentication/login';

    return this.http.post<AuthDataInput>(url, bodyParams);
  }

  public registerUser(
    bodyParams: UserCredentialsInput
  ): Observable<AuthDataInput> {
    const url = environment.baseApiUrl + '/authentication/register';

    return this.http.post<AuthDataInput>(url, toFormData(bodyParams));
  }

  public getAuthDetails(): AuthDataInput {
    console.log(JSON.parse(sessionStorage.getItem('authCredentials')));
    return JSON.parse(sessionStorage.getItem('authCredentials'));
  }

  public getCurrentUser(): Observable<CurrentUserData> {
    const url = environment.baseApiUrl + '/authentication/currentUser';
    const authToken = this.getAuthDetails().access_token;

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authToken
    });
    return this.http.get<CurrentUserData>(
      url,
      {
        headers: httpHeaders
      }
    );
  }
}
