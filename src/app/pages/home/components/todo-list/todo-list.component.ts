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
    // Subscribe to the todo list observable for updates
    this.todoService.getTodoList().subscribe((list) => {
      this.todoList = list;
      this.updateTaskInfo();
    });
  }

  updateTodoList() {
    this.todoService.updateTodoListByFinishedOrder(this.todoList)
    this.updateTaskInfo()
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodoApi(todoId)
    this.updateTaskInfo()
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodoListByFinishedOrder(this.todoList)
    this.todoService.updateTodoApi(todo.id, todo).subscribe((res) => {
      console.log(res.message)
    })
  }

  updateTaskInfo() {
    this.totalTasks = this.todoList.length
    this.finishTasks = this.todoList.filter((todo) => todo.finished).length
  }

}
