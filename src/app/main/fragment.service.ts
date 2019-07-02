import { IFragment } from './fragment';
import { IDirectory } from './directory';
import { IPage } from './page';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, Observer, observable } from 'rxjs';
import { catchError, tap, first, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FragmentService {

  private url = 'http://localhost/templates/';
  private directories = 'getDirectories.php';
  private fragments = 'getFragments.php';

  constructor(private http: HttpClient) {
  }

  addFragment(frag: IFragment, pageId: number): Observable<IFragment> {
    return this.http.post<IFragment>(`${this.url}addFragment.php`, { fragment: frag, pageId })
      .pipe(
        catchError(this.handleError)
      );
  }


  getDictionariesAndPages(): Observable<IDirectory[]> {
    return this.http.get<IDirectory[]>(this.url + this.directories).pipe(
      tap(data => console.log('all:', data)),
      catchError(this.handleError)
    );
  }

  getFragments(id: number): Observable<IFragment[]> {
    return this.http.get<IFragment[]>(`${this.url}${this.fragments}?page_id=${id}`).pipe(
      catchError(this.handleError)
    );
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
}
