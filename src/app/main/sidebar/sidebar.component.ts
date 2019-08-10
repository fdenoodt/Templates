import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FragmentService } from '../services/fragment.service';
import { IDirectory } from '../directory';
import { IPage } from '../page';
import { ITreeItem } from '../treeItem';
import { WarnerService } from '../../shared/warning/warner.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [FragmentService]
})
export class SidebarComponent implements OnInit {
  public data: IDirectory[] = [];
  public expandedKeys: any[] = [];
  public selectedItem: ITreeItem = null;
  public errorMessage: string;
  public canAddPage = false;
  public treeViewSelected: Boolean = false;

  @Input() selectedKeys: any[] = [];
  @Output() selectionChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fragmentsService: FragmentService, private warningService: WarnerService) { }

  ngOnInit() {
    this.loadDirectoriesAndPages();

    const that = this;
    window.addEventListener('keydown', function (e) {
      if (that.treeViewSelected) {
        if (e.key === 'F2' || e.code === 'F2') {
          that.warningService.onClose(that.handlePopupClosed, that);
          that.warningService.open({
            title: 'Enter a new name',
            input: that.selectedItem.text,
          });
        }
      }
    });
  }

  handlePopupClosed(res: any, who: any): void {
    const selected = who.selectedItem;

    if (res.status === 'ok') {
      who.selectedItem.text = res.text;
      who.fragmentsService.updateDirOrPage(selected).subscribe(
        data => {

        },
        error => {
          return this.errorMessage = <any>error;
        }
      );
    }
  }

  loadDirectoriesAndPages(): void {
    this.errorMessage = 'Loading...'
    this.fragmentsService.getDictionariesAndPages().subscribe(
      data => {
        this.errorMessage = '';
        this.data = data;
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

  reconnect(): void {
    this.errorMessage = '';
    this.loadDirectoriesAndPages();
  }

  handleSelection({ dataItem, index }: any): void {
    this.selectedItem = dataItem;

    if (dataItem.type === 'page') {
      this.selectionChanged.emit(dataItem);

    } else { // Open directory

      this.canAddPage = true;
      this.selectionChanged.emit(null);

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
      type: null,
    };

    this.fragmentsService.addDirectory(dir).subscribe(
      data => {
        this.data.push(data);
      },
      error => {
        return this.errorMessage = <any>error;
      }
    );
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
        // No validation for page or dir needed because buttton is disabled when page selected
        (this.selectedItem as IDirectory).items.push(data);
      },
      error => {
        return this.errorMessage = <any>error;
      }
    );
  }

  delSitebarItem(): void {
    const id = this.selectedItem.id;
    if (this.selectedItem.type === 'page') {
      this.fragmentsService.removePage(id).subscribe(
        () => {
          for (const dir of this.data) {
            const pages = dir.items.filter(e => e.id === id);
            if (pages.length > 0) {
              const page = pages[0];
              dir.items.splice(dir.items.indexOf(page), 1);
              this.clearSelection();
              break;
            }
          }
          // const frag = this.data.filter(e => e.id === id)[0];

          this.clearSelection();
        },
        error => this.errorMessage = <any>error
      );
    } else {
      this.fragmentsService.removeDir(id).subscribe(
        () => {
          const dir = this.data.filter(e => e.id === id)[0];
          this.data.splice(this.data.indexOf(dir), 1);
          this.clearSelection();
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  clearSelection(): void {
    this.selectedItem = null;
    this.selectedKeys = [];
  }

  focus(): void {
    this.treeViewSelected = true;

  }

  lostFocus(): void {
    this.treeViewSelected = false;
  }

}
