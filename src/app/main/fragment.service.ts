import { IFragment } from './fragment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Observer, observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FragmentService {
  constructor(private http: HttpClient) {
  }

  getFragmentsByName(): Observable<IFragment[]> {
    return this.http.get<IFragment[]>('http://127.0.0.1:5000/').pipe(
      tap(data => console.log('all:', data)), catchError(this.handleError)
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
