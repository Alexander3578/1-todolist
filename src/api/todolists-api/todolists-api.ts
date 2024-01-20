import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'd73077ae-433c-4ece-8816-d836252a42fe'
    }
})

//TYPES

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistType = TodolistResponseType & {
    filter: FilterValuesType
}

export type ResponseType<D = {}> = {
    data: D
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    // addedDate: string
}

export const todolistsApi = {

    getTodoApi: () => {
        return instance.get<TodolistResponseType[]>('/todo-lists');
    },

    createTodoApi: (todoTitle: string) => {
        return instance.post<ResponseType<{ item: TodolistResponseType }>>('/todo-lists', {title: todoTitle});
    },

    deleteTodoApi: (todoId: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}`);
    },

    updateTodoApi: (todoId: string, todoTitle: string) => {
        return instance.put<ResponseType>(`/todo-lists/${todoId}`, {title: todoTitle});
    }

}

