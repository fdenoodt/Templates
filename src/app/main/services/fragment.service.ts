import { IFragment } from '../fragment';
import { IDirectory } from '../directory';
import { IPage } from '../page';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ITreeItem } from '../treeItem';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class FragmentService {

  private directories = 'getDirectories.php';
  private fragments = 'getFragments.php';

  constructor(private restService: AuthService) {
  }

  addFragment(fragment: IFragment, pageId: number): Observable<IFragment> {
    return this.restService.post<IFragment>(`addFragment.php`, { fragment, pageId })
  }

  addPage(page: IPage, dirId: number): Observable<IPage> {
    return this.restService.post<IPage>(`addPage.php`, { id: page.id, text: page.text, dirId })
      .pipe(
        map(v => {
          return { id: v.id, text: v.text, type: 'page', fragments: [] };
        }),
        tap(data => console.log('all:', data)),
      );
  }

  addDirectory(dir: IDirectory): Observable<IDirectory> {
    return this.restService.post<IDirectory>(`addDirectory.php`, { id: dir.id, text: dir.text })
      .pipe(
        map(v => {
          return { id: v.id, text: v.text, type: 'directory', items: [] };
        }),
      );
  }

  removeFragment(id: number) {
    return this.restService.post<IFragment>(`removeFragment.php`, id)
  }

  removePage(id: number) {
    return this.restService.post<IFragment>(`removePage.php`, id)
  }

  removeDir(id: number) {
    return this.restService.post<IFragment>(`removeDirectory.php`, id)
  }

  updateFragment(fragment: IFragment): Observable<IFragment> {
    return this.restService.post<IFragment>(`updateFragment.php`, fragment)
  }

  updateDirOrPage(item: ITreeItem): Observable<ITreeItem> {
    return this.restService.post<ITreeItem>(`${item.type === 'page' ? 'updatePage' : 'updateDirectory'}.php`, item)
  }


  getDictionariesAndPages(): Observable<IDirectory[]> {
    // return this.restService.get<IDirectory>(this.directories).pipe(
    return this.restService.get<IDirectory>(this.directories).pipe(
      tap(data => console.log('all:', data))
    )
  }

  getFragments(id: number): Observable<IFragment[]> {
    return this.restService.get<IFragment>(`${this.fragments}`, [{ name: 'page_id', value: id }]).pipe();
    // return this.restService.get<IFragment>(`${this.fragments}?page_id=${id}`).pipe();
  }

  findFragmentsByText(keywords: string): Observable<IFragment[]> {
    return this.restService.get<IFragment>(`findFragments.php`, [{ name: 'text', value: keywords }]).pipe();
    // return this.restService.get<IFragment>(`findFragments.php?text=${keywords}`).pipe();
  }
}
