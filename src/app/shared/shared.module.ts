import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './warning/warning.component';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [WarningComponent],
  imports: [
    CommonModule,
    DialogsModule,
    ButtonsModule,
    InputsModule,

  ], exports: [WarningComponent]
})
export class SharedModule { }
