import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/signin.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './shared/form/form.component';


import { GridModule } from '@progress/kendo-angular-grid';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { EditorModule } from '@progress/kendo-angular-editor';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [
    RegisterComponent,
    FormComponent, 
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    GridModule,
    ToolBarModule,
    EditorModule,
    TreeViewModule,
    InputsModule,
    ClipboardModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports: [
    AuthRoutingModule,
    SignInComponent
  ]
})
export class AuthModule { }
