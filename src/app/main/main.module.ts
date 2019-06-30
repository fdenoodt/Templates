import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module'

import { SidebarComponent } from './sidebar/sidebar.component';
import { FragmentsComponent } from './fragments/fragments.component';
import { FragmentComponent } from './fragment/fragment.component';


@NgModule({
  declarations: [
    SidebarComponent,
    FragmentComponent,
    FragmentsComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: [
    SidebarComponent, FragmentsComponent, FragmentComponent, MainRoutingModule
  ]
})
export class MainModule { }
