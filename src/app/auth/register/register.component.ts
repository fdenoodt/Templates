import { Component, OnInit } from '@angular/core';
import { FormModel } from '../shared/form/form.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
