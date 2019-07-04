import { Injectable } from '@angular/core';
import { IWarning } from './warning';


@Injectable({ providedIn: 'root' })
export class WarnerService {

  warning: IWarning;
  listenForRequestsFunction: Function;
  listenForRequestDoneFunction: Function;
  warningComponent: any;
  constructor() {
  }

  open(warning: IWarning): void {
    this.warning = warning;

    if (this.listenForRequestsFunction != null) {
      this.listenForRequestsFunction(this.warning, this.warningComponent);
    }
  }

  onRequestReceived(func: Function, warningComponent: any) {
    this.listenForRequestsFunction = func;
    this.warningComponent = warningComponent;
  }

  onClose(func: Function) {
    this.listenForRequestDoneFunction = func;
  }

  closed(status): void {
    if (this.listenForRequestDoneFunction != null) {
      this.listenForRequestDoneFunction(status);
      this.listenForRequestDoneFunction = null;
    }
  }

}
