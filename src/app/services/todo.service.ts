import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'platform'
})
export class TodoService {
  private todoList: Todo[] = [
      {id: 1, title: "Todo 1", isFinished: false},
      {id: 2, title: "Todo 2", isFinished: true},
      {id: 3, title: "Todo 3", isFinished: false}
  ]

  getTodoList() {
    return this.updateTodoListByFinishedOrder();
  }

  updateTodoListByFinishedOrder() {
    return this.todoList.sort((todo1, todo2) => {
      const a = todo1.isFinished ? 1 : 0
      const b = todo2.isFinished ? 1 : 0

      return a - b
    })
  }
}
