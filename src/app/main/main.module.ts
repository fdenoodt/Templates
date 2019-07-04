import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarBottomComponent } from './sidebar/sidebar-bottom/sidebar-bottom.component';
import { FragmentsComponent } from './fragments/fragments.component';
import { FragmentComponent } from './fragment/fragment.component';

import { GridModule } from '@progress/kendo-angular-grid';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { EditorModule } from '@progress/kendo-angular-editor';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { ClipboardModule } from 'ngx-clipboard';
import { HighlightModule } from 'ngx-highlightjs';


import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

export function hljsLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml }
  ];
}

@NgModule({
  declarations: [
    SidebarBottomComponent,
    SidebarComponent,
    FragmentComponent,
    FragmentsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    GridModule,
    ToolBarModule,
    EditorModule,
    TreeViewModule,
    InputsModule,
    ClipboardModule,
    ReactiveFormsModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ],
  exports: [
    SidebarBottomComponent, SidebarComponent, FragmentsComponent, FragmentComponent, MainRoutingModule
  ]
})
export class MainModule { }
