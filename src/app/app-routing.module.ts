import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './start/start.component';
import { SignInComponent } from './auth/sign-in/signin.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/guards/auth-guard.service';

const routes: Routes = [
  { path: 'auth', component: SignInComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '', component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
