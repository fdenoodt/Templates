import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = 'http://localhost/templates/';
  private currentUser: User;
  constructor(private http: HttpClient) { }

  post<T>(url: string, object: any, xTimes: number = 3): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    const body: any = object;
    if (this.exists(this.currentUser))
      body.jwt = this.currentUser.token;

    return this.http.post<T>(url, body, httpOptions)
      .pipe(
        tap((data: any) => {
          if (this.exists(data) && this.exists(data.jwt) && this.exists(this.currentUser))
            this.currentUser.token = data.jwt;
        }),
        catchError(this.handleError),
        retry(xTimes)
      );
  }

  createUser(name: string, password: string): Observable<User> {
    return this.post<any>(`${this.url}auth/create_user.php`, [{ name: name, password: password }])
      .pipe(
        mergeMap(data => {
          // todo: check if success
          if (this.exists(data)) {
            return this.signIn(name, password);
            // return { name: name, token: data.jwt }

          }
        })
      )
  }

  signIn(name: string, password: string): Observable<User> {
    return this.post<any>(`${this.url}/auth/login.php`, { name, password })
      .pipe(
        map(data => {
          if (this.exists(data)) {
            const currentUser = {
              name: name,
              token: data.jwt
            }

            this.currentUser = currentUser;
            return currentUser;
          }
          else {
            return { name: null, token: null }
          }
        })
      )
  }

  handleError(handleError: HttpErrorResponse) {
    console.error('something went wrong');
    console.log(handleError);

    let errMsg: string;
    if (handleError.error instanceof ErrorEvent) {
      errMsg = `err ${handleError.error.message}`;
    } else {
      errMsg = `Something went wrong on the serverside, Error status: ${handleError.status}`;
    }
    return throwError(errMsg);
  }

  private exists(field): boolean {
    return field !== null && field !== undefined;
  }

  public isAuthenticated(): boolean {
    return this.exists(this.currentUser) && this.exists(this.currentUser.token);
  }

}