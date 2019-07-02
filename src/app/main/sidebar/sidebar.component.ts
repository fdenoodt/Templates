import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FragmentService } from '../fragment.service';
import { IDirectory } from '../directory';
import { IPage } from '../page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [FragmentService]
})
export class SidebarComponent implements OnInit {
  public data: IDirectory[] = [];
  public selectedKeys: any[] = [];
  public expandedKeys: any[] = [];
  public errorMessage: string;


  @Output() selectionChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fragmentsService: FragmentService) { }

  ngOnInit() {
    this.fragmentsService.getDictionariesAndPages().subscribe(
      data => {
        this.data = data;
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

  public handleSelection({ dataItem, index }: any): void {
    if (dataItem.type === 'page') {
      const id = dataItem.id;
      this.selectionChanged.emit(id);
    } else { // Open directory
      this.selectionChanged.emit(0);

      if (this.expandedKeys.includes(index)) {
        this.expandedKeys.splice(this.expandedKeys.indexOf(index), 1);
      } else {
        this.expandedKeys.push(index);
      }
    }
  }

}
