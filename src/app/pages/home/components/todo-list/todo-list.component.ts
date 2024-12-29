import { Component, inject, OnChanges, SimpleChanges } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Todo } from "../../../../models/todo";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "../todo/todo.component";
import { TodoService } from "../../../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, MatIconModule, TodoComponent],
  providers: [TodoService],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnChanges {
  private todoService = inject(TodoService)
  todoList: Todo[] = []

  constructor() {
    this.todoList = this.todoService.getTodoList()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changed")
  }

  updateTodoList(todoId: number) {
    this.todoService.updateTodoListByFinishedOrder()
  }
}
