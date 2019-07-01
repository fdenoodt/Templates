import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public selectedFragmentPage = 0;
  constructor() { }

  ngOnInit() {
  }

  fragmentsRequested(id: number): void {
    this.selectedFragmentPage = id;
  }

}
