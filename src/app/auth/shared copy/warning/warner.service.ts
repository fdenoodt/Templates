import { Injectable } from '@angular/core';
import { IWarning } from './warning';


@Injectable({ providedIn: 'root' })
export class WarnerService {

  warning: IWarning;
  listenForRequestsFunction: Function;
  listenForRequestDoneFunction: Function;
  warningComponent: any;
  senderComponent: any;
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

  onClose(func: Function, senderComponent: any) {
    this.listenForRequestDoneFunction = func;
    this.senderComponent = senderComponent;
  }

  closed(res): void {
    if (this.listenForRequestDoneFunction != null) {
      this.listenForRequestDoneFunction(res, this.senderComponent);
      this.listenForRequestDoneFunction = null;
    }
  }

}
