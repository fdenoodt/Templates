import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FragmentService } from '../fragment.service';
import { IFragment } from '../fragment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [FragmentService]
})
export class SidebarComponent implements OnInit {
  public data: IFragment[] = [];
  public selectedKeys: any[] = [];
  public errorMessage: string;


  @Output() selectionChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fragmentsService: FragmentService) { }

  ngOnInit() {
    this.fragmentsService.getFragmentsByName().subscribe(
      data => {
        this.data = data;
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

  public handleSelection({ dataItem }: any): void {
    const id = dataItem.id;
    this.selectionChanged.emit(id);
  }

}
