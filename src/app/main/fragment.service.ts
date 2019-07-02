import { IFragment } from './fragment';
import { IDirectory } from './directory';
import { IPage } from './page';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Observer, observable } from 'rxjs';
import { catchError, tap, first, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FragmentService {

  private url = 'http://localhost/templates/getDirectories.php';

  constructor(private http: HttpClient) {
  }

  getDictionariesAndPages(): Observable<IDirectory[]> {
    return this.http.get<IDirectory[]>(this.url).pipe(
      tap(data => console.log('all:', data)),
      catchError(this.handleError)
    );
  }

  getFragment(id: number): Observable<IFragment[]> {
    return this.http.get<IFragment[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(handleError: HttpErrorResponse) {
    console.error('something went wrong');

    let errMsg: string;
    if (handleError.error instanceof ErrorEvent) {
      errMsg = `err ${handleError.error.message}`;
    } else {
      errMsg = `Something went wrong on the serverside, Error status: ${handleError.status}`;
    }
    return throwError(errMsg);
  }
}
