import { Component, OnInit, ElementRef } from '@angular/core';
import { WarnerService } from './warner.service';
import { stat } from 'fs';
import { IWarning } from './warning';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  providers: []
})
export class WarningComponent implements OnInit {

  warning: IWarning;
  dialogOpened = false;
  constructor(private warnerService: WarnerService, private el: ElementRef) {
    this.warnerService.onRequestReceived(this.handleWarning, this);
  }

  ngOnInit() {
  }

  handleWarning(warning: IWarning, who: any) {
    who.warning = warning;
    who.open('dialog');
  }

  close(component) {
    this[component + 'Opened'] = false;
  }

  open(component) {
    this[component + 'Opened'] = true;
  }

  action(status) {
    this.handleClosure(status);
  }

  private handleClosure(status) {
    this.dialogOpened = false;
    this.warnerService.closed({ status, text: this.warning.input });
  }

}
