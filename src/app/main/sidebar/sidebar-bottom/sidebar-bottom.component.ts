import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FragmentService } from '../../fragment.service';
import { IFragment } from '../../fragment';

@Component({
  selector: 'app-sidebar-bottom',
  templateUrl: './sidebar-bottom.component.html',
  styleUrls: ['./sidebar-bottom.component.scss'],
  providers: [FragmentService]
})
export class SidebarBottomComponent implements OnInit {

  searchField: string;

  @Output() fragmentsFound: EventEmitter<IFragment[]> = new EventEmitter<IFragment[]>();

  constructor(private fragmentsService: FragmentService) { }

  ngOnInit() {
  }

  search(): void {
    // this.searchField = ' '; //TEMPORARY WORKAROUND, MUST BE IMPROVED WITH FORMBUILDER AND CLEARING TEXT
    this.fragmentsService.findFragmentsByText(this.searchField.trim()).subscribe(
      data => {
        this.fragmentsFound.emit(data);
      },
      error => console.log(error)
    );
  }

}
