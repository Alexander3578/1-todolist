import {FilterValuesType, TodoListType} from '../../App';
import {v1} from 'uuid';

export const REMOVE_TODO_LIST = 'REMOVE-TODO-LIST'
export const ADD_TODO_LIST = 'ADD-TODO-LIST'
const UPDATE_TODO_LIST = 'UPDATE-TODO-LIST'
const CHANGE_TODO_LIST_FILTER = 'CHANGE-TODO-LIST-FILTER'

export type TodoActionType = removeTodoListACType | addTodoListACType | updateTodoListACType | changeTodoListFilterACType;

export const todoIdOne = v1();
export const todoIdTwo = v1();

const initialTodoState:TodoListType[] = []

export const todolistReducer = (state: TodoListType[] = initialTodoState, action: TodoActionType):TodoListType[] => {
    switch (action.type) {
        case REMOVE_TODO_LIST: {
            return state.filter(todo => todo.id !== action.payload.todoId)
        }
        case ADD_TODO_LIST: {
            return [{id: action.payload.todolistId, title: action.payload.todoName, filter: 'all'},...state]
        }
        case UPDATE_TODO_LIST: {
            return state.map(todo => (todo.id === action.payload.todoId
                ? {...todo, title: action.payload.newTodoTitle} : todo))
        }
        case CHANGE_TODO_LIST_FILTER: {
            return state.map(todo => (todo.id === action.payload.todoId
                ? {...todo, filter: action.payload.newFilterValue} : todo))
        }
        default: return state
    }
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (todoId: string) => {
    return {
        type: REMOVE_TODO_LIST,
        payload: {
            todoId
        }
    } as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (todoName: string) => {
    return {
        type: ADD_TODO_LIST,
        payload: {
            todoName,
            todolistId: v1()
        }
    } as const
}

type updateTodoListACType = ReturnType<typeof updateTodoListAC>

export const updateTodoListAC = (todoId: string, newTodoTitle: string) => {
    return {
        type: UPDATE_TODO_LIST,
        payload: {
            todoId,
            newTodoTitle
        }
    } as const
}

type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>

export const changeTodoListFilterAC = (todoId: string, newFilterValue: FilterValuesType) => {
    return {
        type: CHANGE_TODO_LIST_FILTER,
        payload: {
            todoId,
            newFilterValue
        }
    } as const
}