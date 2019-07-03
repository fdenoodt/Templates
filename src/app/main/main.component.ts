import { Component, OnInit } from '@angular/core';
import { IFragment } from './fragment';
import { IDirectory } from './directory';
import { IPage } from './page';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public selectedFragmentPage: IPage;
  public foundFragments: IFragment[] = null;
  public selectedKeys: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  fragmentsRequested(page: IPage): void {
    this.selectedFragmentPage = page;
    this.foundFragments = null;
  }

  fragmentsFound(data: IFragment[]): void {
    this.selectedFragmentPage = null;
    this.foundFragments = data;
    this.selectedKeys = [];
  }

}
