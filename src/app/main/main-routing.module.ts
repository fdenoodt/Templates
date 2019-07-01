import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FragmentComponent } from './fragment/fragment.component'
import { MainComponent } from './main.component'



const routes: Routes = [
  {
    path: '',
    component: FragmentComponent,
    outlet: 'secondRouter'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class MainRoutingModule { }
