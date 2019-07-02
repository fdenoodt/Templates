import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { IFragment } from '../fragment';
import { ClipboardService } from 'ngx-clipboard';
import { FragmentService } from '../fragment.service';

@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss'],
  providers: [FragmentService]
})
export class FragmentComponent implements OnInit, OnChanges {

  @Input() fragment: IFragment;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  copied: Boolean = false;

  constructor(private _clipboardService: ClipboardService, private fragmentsService: FragmentService) { }

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

  delete(): void {
    this.deleted.emit(this.fragment.id);
  }

}
