import { AxiosInstance } from "axios";
import { RequestStatus } from "state/reducers/appSlice";

//TYPES
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistResponseType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TodolistType = TodolistResponseType & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

export type FieldsErrorType = {
  error: string;
  field: string;
};

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
