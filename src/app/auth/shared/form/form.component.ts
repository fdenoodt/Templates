import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormModel } from './form.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() name = '';
  @Input() password = '';
  @Input() response = '';
  @Output() onSubmit: EventEmitter<FormModel> = new EventEmitter<FormModel>();

  form: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.name, [Validators.required]],
      password: [this.password, [Validators.required]]
    })
  }

  submit() {
    this.onSubmit.emit({
      name: (this.form.value.name),
      password: (this.form.value.password)
    })
  }

}
