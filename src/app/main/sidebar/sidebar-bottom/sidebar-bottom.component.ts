import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FragmentService } from '../../fragment.service';
import { IFragment } from '../../fragment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar-bottom',
  templateUrl: './sidebar-bottom.component.html',
  styleUrls: ['./sidebar-bottom.component.scss'],
  providers: [FragmentService]
})
export class SidebarBottomComponent implements OnInit {

  form: FormGroup;
  private selectedSearch: Boolean = false;


  @Output() fragmentsFound: EventEmitter<IFragment[]> = new EventEmitter<IFragment[]>();

  constructor(private fragmentsService: FragmentService, private fb: FormBuilder, private el: ElementRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: ['', [Validators.required]]
    });

    this.form.patchValue({ search: '' });

    const that = this;
    window.addEventListener('keydown', function (e) {

      // ctrl + F
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        that.searchInput().focus();
      }

      // esc
      if (e.key === 'Escape' || e.code === 'Escape') {
        that.searchInput().blur();
      }

    });
  }

  searchInput(): any {
    const foundElements = this.el.nativeElement.querySelectorAll('.searchField');
    if (foundElements.length > 0) {
      return foundElements[0];
    }
  }

  search(): void {
    this.fragmentsService.findFragmentsByText((this.form.get('search').value).trim()).subscribe(
      data => {
        this.fragmentsFound.emit(data);
      },
      error => console.log(error)
    );

  }

  focus(): void {
    this.form.get('search').setValidators([Validators.required]);
    this.form.get('search').updateValueAndValidity();

    this.selectedSearch = true;
  }

  lostFocus(): void {
    this.form.get('search').clearValidators();
    this.form.get('search').updateValueAndValidity();

    this.selectedSearch = false;
  }
}
