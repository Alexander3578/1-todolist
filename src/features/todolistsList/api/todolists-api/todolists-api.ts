import { AxiosInstance } from "axios";
import { FieldsErrorType, TodolistResponseType } from "features/todolistsList/api/todolists-api/todolistsApi.types";

export type BaseResponseType<D = {}> = {
  data: D;
  messages: string[];
  fieldsErrors: FieldsErrorType[];
  resultCode: number;
  // addedDate: string
};

export class TodolistsApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getTodoApi() {
    return this.instance.get<TodolistResponseType[]>("/todo-lists");
  }

  createTodoApi(todoTitle: string) {
    return this.instance.post<BaseResponseType<{ item: TodolistResponseType }>>("/todo-lists", {
      title: todoTitle,
    });
  }

  deleteTodoApi(todoId: string) {
    return this.instance.delete<BaseResponseType>(`/todo-lists/${todoId}`);
  }

  updateTodoApi(todoId: string, todoTitle: string) {
    return this.instance.put<BaseResponseType>(`/todo-lists/${todoId}`, { title: todoTitle });
  }
}
