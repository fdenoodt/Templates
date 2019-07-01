import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { sampleFragments } from '../fragments';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public true = true;
  public data: any[] = sampleFragments;
  public selectedKeys: any[] = [];

  @Output() selectionChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public handleSelection({ dataItem }: any): void {
    const id = dataItem.id;
    this.selectionChanged.emit(id);
  }

}
