import { inject, Injectable } from '@angular/core';
import { CreateTodoBody, Todo, TodoListResponse } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private httpClient = inject(HttpClient);
  private todoListSubject = new BehaviorSubject<Todo[]>([]);
  private todoList: Todo[] = [];

  constructor() {
    this.getTodoListApi();
  }

  // Api
  getTodoListApi(): void {
    this.httpClient.get<TodoListResponse>('/todos').subscribe((res) => {
      this.todoList = this.updateTodoListByFinishedOrder(res.metadata);
      this.todoListSubject.next(this.todoList);
    });
  }

  createTodoApi(createTodoBody: CreateTodoBody): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>('/todos', createTodoBody)
  }

  // Helpers
  getTodoList(): Observable<Todo[]> {
    return this.todoListSubject.asObservable();
  }

  updateTodoListByFinishedOrder(todoList: Todo[]): Todo[] {
    return todoList.sort((a, b) => (a.finished === b.finished ? 0 : a.finished ? 1 : -1));
  }

  deleteTodoApi(id: string): void {
    this.httpClient.delete<MessageResponse>(`/todos/${id}`).subscribe(() => {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
      this.todoListSubject.next(this.todoList);
    })
  }

  updateTitle(todo: Todo): void {
    const index = this.todoList.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      this.todoList[index].title = todo.title;
      this.todoListSubject.next(this.todoList);
      console.log('Updated title:', todo.title);
    }
  }

  searchTodo(title: string): void {
    const filteredList = this.todoList.filter((todo) =>
      todo.title.toLowerCase().includes(title.trim().toLowerCase())
    );
    this.todoListSubject.next(filteredList);
  }
}
