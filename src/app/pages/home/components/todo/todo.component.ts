import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, UpdateTodoBody } from '../../../../models/todo';
import { MatIconModule } from '@angular/material/icon';
import { RadioButtonComponent } from '../../../../shared/radio-button/radio-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule, MatIconModule, RadioButtonComponent],
  providers: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo!: Todo;

  @Output() deleteTodoEvent = new EventEmitter<string>();
  @Output() updateTodoEvent = new EventEmitter<Todo>();

  private updateTodoSubject = new Subject<Todo>();

  constructor() {
    this.updateTodoSubject.pipe(debounceTime(500)).subscribe((todo) => {
      this.updateTodoEvent.emit(todo)
    })
  }

  onCheckedChange() {
    this.todo.finished = !this.todo.finished
    this.updateTodoSubject.next(this.todo)
  }

  deleteTodo(id: string) {
    this.deleteTodoEvent.emit(id)
  }

  updateTitle(title: string) {
    this.todo.title = title
    this.updateTodoSubject.next(this.todo)
  }
}
