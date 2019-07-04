import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-warning></app-warning>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Templates';
}
