import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IFragment } from '../fragment';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent implements OnInit, OnChanges {

  @Input() fragment: IFragment;

  constructor(private _clipboardService: ClipboardService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
  }

  click(event: MouseEvent): void {
    if (event.ctrlKey === true) {
      console.log('hi', this.fragment.content);
      this._clipboardService.copyFromContent(this.fragment.content);
    }
  }

}
