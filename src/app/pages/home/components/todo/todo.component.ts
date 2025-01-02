import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../models/todo';
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

  @Output() updateTodoEvent = new EventEmitter<void>();
  @Output() deleteTodoEvent = new EventEmitter<string>();
  @Output() updateTitleEvent = new EventEmitter<Todo>();

  private titleUpdateSubject = new Subject<string>();

  constructor() {
    this.titleUpdateSubject.pipe(debounceTime(1000)).subscribe((title) => {
      if(title.length > 0) {
        this.updateTitleEvent.emit(this.todo)
      }
    })
  }

  onCheckedChange() {
    this.todo.finished = !this.todo.finished
    this.updateTodoEvent.emit()
  }

  deleteTodo(id: string) {
    this.deleteTodoEvent.emit(id)
  }

  updateTitle(title: string) {
    this.todo.title = title
    this.titleUpdateSubject.next(title)
  }
}
