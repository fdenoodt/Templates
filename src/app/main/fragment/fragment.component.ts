import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { IFragment } from '../fragment';
import { ClipboardService } from 'ngx-clipboard';
import { FragmentService } from '../services/fragment.service';
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
  @Input() found: Boolean;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  copied: Boolean = false;
  synchronizing: Boolean = false;
  fragmentForm: FormGroup;
  errorMessage: string;

  highlight: string = `function myFunction() {
    document.getElementById("demo1").innerHTML = "Hello there!";
    document.getElementById("demo2").innerHTML = "How are you?";
  }`;

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

  enableEditMode(): void {
    this.fragment.editMode = true;
  }

  disbableEditMode(): void {
    this.fragment.editMode = false;
  }

  submit(res): void {
    const title = res.title;
    const content = res.content;

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

  tabPressed(): void {

  }

}
