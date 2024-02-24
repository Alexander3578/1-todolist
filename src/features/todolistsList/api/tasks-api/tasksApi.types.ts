import { UpdateDomainTaskModelType } from "features/todolistsList/model/tasks/tasksSlice";

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
