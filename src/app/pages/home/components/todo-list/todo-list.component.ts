import { Component, inject, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Todo } from "../../../../models/todo";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "../todo/todo.component";
import { TodoService } from "../../../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, MatIconModule, TodoComponent],
  providers: [],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService)

  todoList: Todo[] = []
  totalTasks = 0
  finishTasks = 0

  ngOnInit(): void {
    this.todoService.todoList$.subscribe((todoList) => {
      this.todoList = this.todoService.updateTodoListByFinishedOrder(todoList)
      this.updateTaskInfo()
    })
  }

  updateTodoList() {
    this.todoService.updateTodoListByFinishedOrder(this.todoList)
    this.updateTaskInfo()
  }

  deleteTodo(todoId: number) {
    this.todoList = this.todoService.deleteTodo(todoId)
    this.updateTaskInfo()
  }

  updateTaskInfo() {
    this.totalTasks = this.todoService.getTotalTasks()
    this.finishTasks = this.todoService.getFinishTasks()
  }

  updateTitle(todo: Todo) {
    this.todoService.updateTitle(todo)
  }
}
