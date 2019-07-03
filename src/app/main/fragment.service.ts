import { IFragment } from './fragment';
import { IDirectory } from './directory';
import { IPage } from './page';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl, FormArray } from '@angular/forms';
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

  addFragment(fragment: IFragment, pageId: number): Observable<IFragment> {
    return this.http.post<IFragment>(`${this.url}addFragment.php`, { fragment, pageId })
      .pipe(
        catchError(this.handleError)
      );
  }

  addPage(page: IPage, dirId: number): Observable<IPage> {
    return this.http.post<IPage>(`${this.url}addPage.php`, { id: page.id, text: page.text, dirId })
      .pipe(
        map(v => {
          return { id: v.id, text: v.text, type: 'page', fragments: [] };
        }),
        tap(data => console.log('all:', data)),
        catchError(this.handleError)
      );
    // TODO: ADD TYPES 

  }

  addDirectory(dir: IDirectory): Observable<IDirectory> {
    return this.http.post<IDirectory>(`${this.url}addDirectory.php`, { id: dir.id, text: dir.text })
      .pipe(
        map(v => {
          return { id: v.id, text: v.text, type: 'directory', items: [] };
        }),
        catchError(this.handleError)
      );
  }

  removeFragment(id: number) {
    return this.http.post<IFragment>(`${this.url}removeFragment.php`, id)
      .pipe(
        catchError(this.handleError)
      );
  }

  removePage(id: number) {
    return this.http.post<IFragment>(`${this.url}removePage.php`, id)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeDir(id: number) {
    return this.http.post<IFragment>(`${this.url}removeDirectory.php`, id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateFragment(fragment: IFragment): Observable<IFragment> {
    return this.http.post<IFragment>(`${this.url}updateFragment.php`, fragment)
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

  findFragmentsByText(keywords: string): Observable<IFragment[]> {
    return this.http.get<IFragment[]>(`${this.url}findFragments.php?text=${keywords}`).pipe(
      catchError(this.handleError)
    );
  }
}
