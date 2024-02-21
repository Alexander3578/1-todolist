import { BaseResponseType } from "common/api/todolists-api/todolists-api";
import { UpdateDomainTaskModelType } from "state/reducers/tasksSlice";
import { AxiosInstance } from "axios";

//TYPES
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type UpdateTaskModelType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type TaskType = {
  description: string | null;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskArgs = {
  taskId: string;
  model: UpdateDomainTaskModelType;
  todoId: string;
};

export type DeleteTaskArgs = {
  taskId: string;
  todoId: string;
};

export class TasksApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getTasksApi(todoId: string) {
    return this.instance.get<GetTasksResponse>(`/todo-lists/${todoId}/tasks`);
  }

  createTaskApi(todoId: string, taskTitle: string) {
    return this.instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todoId}/tasks`, {
      title: taskTitle,
    });
  }

  deleteTaskApi(args: DeleteTaskArgs) {
    return this.instance.delete<BaseResponseType>(`/todo-lists/${args.todoId}/tasks/${args.taskId}`);
  }

  updateTaskApi(todoId: string, taskId: string, model: UpdateDomainTaskModelType) {
    return this.instance.put<BaseResponseType>(`/todo-lists/${todoId}/tasks/${taskId}`, { ...model });
  }
}
