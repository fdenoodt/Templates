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
  public selectedItem: IDirectory = null;
  public errorMessage: string;
  public canAddPage = false;


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

  handleSelection({ dataItem, index }: any): void {

    if (dataItem.type === 'page') {
      const id = dataItem.id;
      this.selectionChanged.emit(id);
      this.selectedItem = null;

    } else { // Open directory
      this.selectedItem = dataItem;

      this.canAddPage = true;
      this.selectionChanged.emit(0);

      if (this.expandedKeys.includes(index)) {
        // Temporary: do nothing
        // this.expandedKeys.splice(this.expandedKeys.indexOf(index), 1);
      } else {
        this.expandedKeys.push(index);
      }
    }
  }

  addDirectory(): void {
    const dir: IDirectory = {
      id: 0,
      text: 'new dir',
      items: [],
      type: null
    };

    this.fragmentsService.addDirectory(dir).subscribe(
      data => {
        this.data.push(data);
      },
      error => {
        return this.errorMessage = <any>error;
      }
    )
  }

  addPage(): void {
    const page: IPage = {
      id: 0,
      text: 'new page',
      fragments: [],
      type: null
    };

    this.fragmentsService.addPage(page, this.selectedItem.id).subscribe(
      data => {
        this.selectedItem.items.push(data);
      },
      error => {
        return this.errorMessage = <any>error;
      }
    );
  }

}
