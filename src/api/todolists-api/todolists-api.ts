import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'd73077ae-433c-4ece-8816-d836252a42fe'
    }
})

export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    data: T
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}

export const todolistsApi = {

    getTodoApi: () => {
        return instance.get<TodolistType[]>('/todo-lists');
    },

    createTodoApi: (todoTitle: string) => {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title: todoTitle});
    },

    deleteTodoApi: (todoId: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}`);
    },

    updateTodoApi: (todoId: string, todoTitle: string) => {
        return instance.put<ResponseType>(`/todo-lists/${todoId}`, {title: todoTitle});
    }

}

