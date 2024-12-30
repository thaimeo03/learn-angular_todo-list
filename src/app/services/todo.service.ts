import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList: Todo[] = [
      {id: 1, title: "Todo 1", isFinished: false},
      {id: 2, title: "Todo 2", isFinished: true},
      {id: 3, title: "Todo 3", isFinished: false}
  ]

  private todoListSubject = new BehaviorSubject<Todo[]>(this.todoList)

  todoList$ = this.todoListSubject.asObservable()

  getTodoList() {
    return this.updateTodoListByFinishedOrder();
  }

  getTotalTasks() {
    return this.todoList.length
  }

  getFinishTasks() {
    let cnt = 0

    for(const todo of this.todoList) {
      if(todo.isFinished) cnt++
    }

    return cnt
  }

  updateTodoListByFinishedOrder() {
    return this.todoList.sort((todo1, todo2) => {
      const a = todo1.isFinished ? 1 : 0
      const b = todo2.isFinished ? 1 : 0

      return a - b
    })
  }

  deleteTodo(id: number) {
    this.todoList = this.todoList.filter(todo => todo.id !== id)
    return this.todoList
  }

  updateTitle(todo: Todo) {
    const index = this.todoList.findIndex((todo) => todo.id === todo.id)

    if(index !== -1) {
      this.todoList[index].title = todo.title
    }

    console.log("Updated title: ", todo.title)
  }

  createTodo(title: string) {
    const id = Math.floor(Math.random() * 10000)

    this.todoList.unshift({
      id,
      title: title.trim(),
      isFinished: false
    })

    this.todoListSubject.next(this.todoList)
  }
}
