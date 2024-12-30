import { Component, EventEmitter, inject, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { InputWithIconComponent } from "../../../../shared/input-with-icon/input-with-icon.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TodoService } from "../../../../services/todo.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'home-create-task',
  imports: [MatIconModule, InputWithIconComponent, ButtonComponent, ReactiveFormsModule, CommonModule],
  providers: [],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  private todoService = inject(TodoService)

  @Output() handleCancelEvent = new EventEmitter<void>();

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required)
  })

  handleCancel(): void {
    this.handleCancelEvent.emit();
  }

  handleCreate() {
    this.todoService.createTodo(this.todoForm.value.title as string)
    this.handleCancel()
    this.todoForm.reset()
  }
}
