import {
    FilterValuesType,
    TodolistResponseType,
    todolistsApi,
    TodolistType
} from '../../api/todolists-api/todolists-api';
import {Dispatch} from 'redux';
import {AppActionType} from '../store';

export const REMOVE_TODO_LIST = 'REMOVE-TODO-LIST'
export const ADD_TODO_LIST = 'ADD-TODO-LIST'
const UPDATE_TODO_LIST = 'UPDATE-TODO-LIST'
const CHANGE_TODO_LIST_FILTER = 'CHANGE-TODO-LIST-FILTER'
const SET_TODO_LISTS = 'SET-TODO-LISTS'

//TYPES

export type TodoActionType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof updateTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsAC>;

const initialTodoState: TodolistType[] = []

export const todolistReducer = (state: TodolistType[] = initialTodoState, action: TodoActionType): TodolistType[] => {
    switch (action.type) {
        case REMOVE_TODO_LIST: {
            return state.filter(todo => todo.id !== action.payload.todoId)
        }
        case ADD_TODO_LIST: {
            return [
                {
                    ...action.payload.todolist,
                    filter: 'all',
                },
                ...state]
        }
        case UPDATE_TODO_LIST: {
            return state.map(todo => (todo.id === action.payload.todoId
                ? {...todo, title: action.payload.newTodoTitle} : todo))
        }
        case CHANGE_TODO_LIST_FILTER: {
            return state.map(todo => (todo.id === action.payload.todoId
                ? {...todo, filter: action.payload.newFilterValue} : todo))
        }
        case SET_TODO_LISTS: {
            return action.payload.todos.map((todo) => ({...todo, filter: 'all'}))
        }
        default:
            return state
    }
}

//ACTION CREATORS

export const removeTodoListAC = (todoId: string) => ({
        type: REMOVE_TODO_LIST,
        payload: {
            todoId
        }
    } as const
)

export const addTodoListAC = (todolist: TodolistType) => ({
        type: ADD_TODO_LIST,
        payload: {
            todolist
        }
    } as const
)

export const updateTodoListAC = (todoId: string, newTodoTitle: string) => ({
        type: UPDATE_TODO_LIST,
        payload: {
            todoId,
            newTodoTitle
        }
    } as const
)

export const changeTodoListFilterAC = (todoId: string, newFilterValue: FilterValuesType) => ({
        type: CHANGE_TODO_LIST_FILTER,
        payload: {
            todoId,
            newFilterValue
        }
    } as const
)

export const setTodoListsAC = (todos: TodolistResponseType[]) => ({
        type: SET_TODO_LISTS,
        payload: {
            todos
        }
    } as const
)

//THUNK CREATORS

export const getTodoListsTC = () => (dispatch: Dispatch<AppActionType>) => {
    todolistsApi.getTodoApi()
        .then(response => dispatch(setTodoListsAC(response.data)))
}