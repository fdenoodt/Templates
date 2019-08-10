import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated)
      this.router.navigate(['/auth'])
    else {
      this.router.navigate(['/main'])
    }
  }

}
