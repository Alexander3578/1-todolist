import { BaseResponseType } from "features/todolistsList/api/todolists-api/todolists-api";
import { UpdateDomainTaskModelType } from "features/todolistsList/model/tasks/tasksSlice";
import { AxiosInstance } from "axios";
import { DeleteTaskArgs, GetTasksResponse, TaskType } from "features/todolistsList/api/tasks-api/tasksApi.types";

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
