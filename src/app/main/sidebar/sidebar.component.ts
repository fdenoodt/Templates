import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  public splitButtonData: Array<any> = [{
    text: 'Option 1'
  }, {
    text: 'Option 2',
  }, {
    text: 'Option 3',
  }];

  public dropdownButtonData: Array<any> = [{
    text: 'Option 1'
  }, {
    text: 'Option 2',
  }, {
    text: 'Option 3',
  }];
  constructor() { }

  ngOnInit() {
  }

}
