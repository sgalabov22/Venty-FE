import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthDataInput, UserCredentialsInput } from '../interfaces';
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
    bodyParams: UserCredentialsInput
  ): Observable<AuthDataInput> {
    const url = environment.baseApiUrl + '/authentication/register';

    return this.http.post<AuthDataInput>(url, toFormData(bodyParams));
  }

  // TODO
  public currentUser(): Observable<any> {
    return of(null);
  }
}
