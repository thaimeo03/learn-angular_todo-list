import { Component, EventEmitter, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { InputWithIconComponent } from "../../../../shared/input-with-icon/input-with-icon.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
@Component({
  selector: 'home-create-task',
  imports: [MatIconModule, InputWithIconComponent, ButtonComponent],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  @Output() handleCancelEvent = new EventEmitter();

  handleCancel(): void {
    this.handleCancelEvent.emit();
  }

  handleCreate(): void {
    console.log('create');
  }
}
