import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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


  @Output() fragmentsFound: EventEmitter<IFragment[]> = new EventEmitter<IFragment[]>();

  constructor(private fragmentsService: FragmentService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: ['', [Validators.required]]
    });

    this.form.patchValue({ search: '' });
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
  }

  lostFocus(): void {
    this.form.get('search').clearValidators();
    this.form.get('search').updateValueAndValidity();
  }
}
