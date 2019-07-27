import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _currentUser: User;
  private base = 'http://localhost/templates/';

  get currentUser(): User {
    return this._currentUser;
  }

  constructor(
    private http: HttpClient
  ) { }

  post<T>(url: string, object: any, xTimes: number = 3): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    const currentUser: User = this.currentUser;
    const body: any = object;
    if (this.exists(currentUser))
      body.jwt = currentUser.token;

    return this.http.post<T>(`${this.base}${url}`, body, httpOptions)
      .pipe(
        tap((data: any) => {
          if (this.exists(data) && this.exists(data.jwt) && this.exists(currentUser))
            currentUser.token = data.jwt; // update token
        }),
        catchError(this.handleError),
        retry(xTimes)
      );
  }

  get<T>(url: string, xTimes: number = 3): Observable<T[]> {
    return this.http.get<T[]>(this.base + url).pipe(
      catchError(this.handleError),
      retry(xTimes)
    )
  }

  createUser(name: string, password: string): Observable<User> {
    return this.post<any>(`auth/create_user.php`, [{ name: name, password: password }])
      .pipe(
        mergeMap(data => {
          // todo: check if success
          if (this.exists(data)) {
            return this.signIn(name, password);
          }
        })
      )
  }

  signIn(name: string, password: string): Observable<User> {
    return this.post<any>(`auth/login.php`, { name, password })
      .pipe(
        map(data => {
          if (this.exists(data)) {
            const currentUser = {
              name: name,
              token: data.jwt
            }

            this._currentUser = currentUser;
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