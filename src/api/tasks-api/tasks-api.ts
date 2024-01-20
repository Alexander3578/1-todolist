import axios from 'axios';
import {ResponseType} from '../todolists-api/todolists-api';
import {UpdateDomainTaskModelType} from '../../state/reducers/tasks-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': 'd73077ae-433c-4ece-8816-d836252a42fe'
    }
})

//TYPES

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const tasksApi = {

    getTasksApi: (todoId: string) => {
        return instance.get<GetTasksResponse>(`/${todoId}/tasks`);
    },

    createTaskApi: (todoId: string, taskTitle: string) => {
        return instance.post<ResponseType<{item: TaskType}>>(`/${todoId}/tasks`, {title: taskTitle});
    },

    deleteTaskApi: (todoId: string, taskId: string) => {
        return instance.delete<ResponseType>(`/${todoId}/tasks/${taskId}`);
    },

    updateTaskApi: (todoId: string, taskId: string, model: UpdateDomainTaskModelType) => {
        return instance.put<ResponseType>(`/${todoId}/tasks/${taskId}`, {...model});
    }

}

