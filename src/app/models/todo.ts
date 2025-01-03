export interface Todo {
  id: string
  title: string
  expiredAt?: Date
  finished: boolean
}

export interface TodoListResponse {
  metadata: Todo[]
}

export interface CreateTodoBody {
  title: string
  expiredAt?: Date
}

export interface UpdateTodoBody extends Partial<CreateTodoBody> {
  finished?: boolean
}
