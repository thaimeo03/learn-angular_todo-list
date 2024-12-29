import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../models/todo';
import { MatIconModule } from '@angular/material/icon';
import { RadioButtonComponent } from '../../../../shared/radio-button/radio-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, MatIconModule, RadioButtonComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo!: Todo;

  @Output() updateTodoEvent = new EventEmitter<number>();

  onValueChange() {
    this.todo.isFinished = !this.todo.isFinished
    this.updateTodoEvent.emit(this.todo.id)
  }
}
