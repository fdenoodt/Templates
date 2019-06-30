import { Component, OnInit } from '@angular/core';
import { products } from './products';

@Component({
  selector: 'app-fragments',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.scss']
})
export class FragmentsComponent implements OnInit {

  public gridData: any[] = products;
  constructor() { }

  ngOnInit() {
  }

}
