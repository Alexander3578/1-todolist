import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': 'd73077ae-433c-4ece-8816-d836252a42fe'
    }
})

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type ResponseType<T = {}> = {
    data: T
    messages: string[];
    resultCode: number;
}

export const tasksApi = {

    getTasksApi: (todoId: string) => {
        return instance.get<TaskType[]>(`/${todoId}/tasks`);
    },

    createTaskApi: (todoId: string, taskTitle: string) => {
        return instance.post<ResponseType<{ item: TaskType }>>(`/${todoId}/tasks`, {title: taskTitle});
    },

    deleteTaskApi: (todoId: string, taskId: string) => {
        return instance.delete<ResponseType>(`/${todoId}/tasks/${taskId}`);
    },

    updateTaskApi: (todoId: string, taskId: string, taskTitle: string) => {
        return instance.put<ResponseType>(`/${todoId}/tasks/${taskId}`, {title: taskTitle});
    }

}

