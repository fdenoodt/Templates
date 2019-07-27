import { Component, OnInit } from '@angular/core';
import { FormModel } from '../shared/form/form.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  errorMessage: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit($event: FormModel) {
    this.authService.signIn($event.name, $event.password).subscribe(user => {
      if (user.token !== null && user.token !== undefined)
        this.router.navigate(['/main'])
      else
        this.errorMessage = 'Error, try again...';
    });
  }

}
