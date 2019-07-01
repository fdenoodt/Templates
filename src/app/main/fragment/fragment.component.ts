import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IFragment } from '../fragment';

@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent implements OnInit, OnChanges {

  @Input() fragment: IFragment;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
  }

}
