import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './warning/warning.component';
import { FormsModule } from '@angular/forms';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [WarningComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogsModule,
    ButtonsModule,
    InputsModule,

  ], exports: [WarningComponent]
})
export class SharedModule { }
