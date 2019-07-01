import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { products } from './products';

@Component({
  selector: 'app-fragments',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.scss']
})
export class FragmentsComponent implements OnInit, OnChanges {

  public gridData: any[] = products;
  @Input() pageId: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
  }

}
