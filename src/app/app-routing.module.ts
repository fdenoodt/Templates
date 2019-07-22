import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './start/start.component';
import { SignInComponent } from './auth/sign-in/signin.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'auth', component: SignInComponent },
  { path: 'main', component: MainComponent },
  { path: '', component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
