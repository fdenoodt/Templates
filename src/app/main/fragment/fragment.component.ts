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
  copied: Boolean = false;

  constructor(private _clipboardService: ClipboardService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
  }

  copy(event: MouseEvent): void {
    if (event.ctrlKey === true) {
      this._clipboardService.copyFromContent(this.fragment.content);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    }
  }

}
