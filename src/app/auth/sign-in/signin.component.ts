import { Component, OnInit } from '@angular/core';
import { FormModel } from '../shared/form/form.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit($event: FormModel) {
    console.log($event);

  }

}
