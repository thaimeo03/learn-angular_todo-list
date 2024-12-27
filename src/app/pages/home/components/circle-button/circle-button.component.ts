import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'home-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss']
})
export class CircleButtonComponent {
  @Input() type = 'submit';

  @Input() isDialog = false;

  @Output() openDialogEvent = new EventEmitter<boolean>();


  handleClick() {
    if (this.isDialog) {
      this.openDialogEvent.emit(true);
    }
  }
}
