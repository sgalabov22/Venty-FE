import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthDataInput, UserCredentialsInput } from '..';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public loginUser(
    bodyParams: UserCredentialsInput
  ): Observable<AuthDataInput> {
    const url = environment.baseApiUrl + '/authetication/login';

    return this.http.post<AuthDataInput>(url, bodyParams);
  }

  public registerUser(
    bodyParams: UserCredentialsInput
  ): Observable<AuthDataInput> {
    const url = environment.baseApiUrl + '/authetication/register';

    return this.http.post<AuthDataInput>(url, bodyParams);
  }

  // TODO
  public currentUser(): Observable<any> {
    return of(null);
  }
}
