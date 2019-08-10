import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map, tap, mergeMap } from 'rxjs/operators';
import { UrlParameter } from './url-parameter.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _currentUser: User;
  private base = 'http://ofabian.be/templates/';

  get currentUser(): User {
    return this._currentUser;
  }

  constructor(
    private http: HttpClient
  ) {
    const strUser = localStorage.getItem('templates token');
    if (strUser !== undefined)
      this.setCurrentUser(JSON.parse(strUser));
  }

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

  get<T>(url: string, params: UrlParameter[] = [], xTimes: number = 3): Observable<T[]> {
    let urlParameters: string = '?';

    if (this.exists(this.currentUser))
      urlParameters += `jwt=${this.currentUser.token}&`;

    params.forEach((parameter: UrlParameter) => {
      urlParameters += `${parameter.name}=${parameter.value}`
    });

    return this.http.get<T[]>(this.base + url + urlParameters).pipe(
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
            const currentUser: User = {
              name: name,
              token: data.jwt
            }

            this.setCurrentUser(currentUser);
            return currentUser;
          }
          else {
            return { name: null, token: null }
          }
        })
      )
  }

  private setCurrentUser(user: User): void {
    this._currentUser = user;
    localStorage.setItem('templates token', JSON.stringify(user));
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