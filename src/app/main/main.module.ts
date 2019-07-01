import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module'

import { SidebarComponent } from './sidebar/sidebar.component';
import { FragmentsComponent } from './fragments/fragments.component';
import { FragmentComponent } from './fragment/fragment.component';

import { GridModule } from '@progress/kendo-angular-grid';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { EditorModule } from '@progress/kendo-angular-editor';
import { TreeViewModule } from '@progress/kendo-angular-treeview';

@NgModule({
  declarations: [
    SidebarComponent,
    FragmentComponent,
    FragmentsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    GridModule,
    ToolBarModule,
    EditorModule,
    TreeViewModule
  ],
  exports: [
    SidebarComponent, FragmentsComponent, FragmentComponent, MainRoutingModule
  ]
})
export class MainModule { }
