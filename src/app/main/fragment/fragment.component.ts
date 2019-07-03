import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { IFragment } from '../fragment';
import { ClipboardService } from 'ngx-clipboard';
import { FragmentService } from '../fragment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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
  synchronizing: Boolean = false;
  fragmentForm: FormGroup;
  errorMessage: string;

  constructor(
    private _clipboardService: ClipboardService,
    private fragmentsService: FragmentService,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.fragmentForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });

    this.fragmentForm.patchValue(this.fragment);

    this.fragmentForm.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(res => {
      if (!this.fragmentForm.invalid) {
        this.submit(res);
      }
    });
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

  submit(res): void {
    const title = res.title;
    const content = res.title;

    this.fragment.title = title;
    this.fragment.content = content;

    this.synchronizing = true;
    this.fragmentsService.updateFragment(this.fragment).subscribe(
      data => {
        this.synchronizing = false;
      },
      error => this.errorMessage = <any>error // casting naar any
    );
  }

}
