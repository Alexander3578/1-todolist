import {TaskStateType} from '../../garbage/App';
import {
    ADD_TODO_LIST, addTodoListAC,
    REMOVE_TODO_LIST, removeTodoListAC, setTodoListsAC
} from './todolists-reducer';
import {TaskPriorities, tasksApi, TaskStatuses, TaskType} from '../../api/tasks-api/tasks-api';
import {Dispatch} from 'redux';
import {AppActionType, AppRootStateType} from '../store';
import {TodolistResponseType} from '../../api/todolists-api/todolists-api';
import {v1} from 'uuid';

const removeTaskAD = 'REMOVE-TASK';
const addTaskAD = 'ADD-TASK';
const updateTaskAD = 'UPDATE-TASK';
const SET_TODO_LISTS = 'SET-TODO-LISTS'
const SET_TASKS = 'SET-TASKS'

//TYPES
export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>;

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

const initialTaskState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialTaskState, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case removeTaskAD: {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.id)
            };
        }
        case addTaskAD: {
            return {
                ...state,
                [action.payload.todoId]: [{
                    title: action.payload.taskName,
                    id: v1(),
                    status: TaskStatuses.New,
                    order: 0,
                    addedDate: '',
                    todoListId: action.payload.todoId,
                    description: '',
                    deadline: '',
                    startDate: '',
                    priority: TaskPriorities.Low
                },
                    ...state[action.payload.todoId],
                ]
            }
        }
        case updateTaskAD: {
            return {
                ...state, [action.payload.todoId]: state[action.payload.todoId]
                    .map(task => task.id === action.payload.taskId ? {
                        ...task,
                        ...action.payload.model
                    } : task)
            }
        }
        case ADD_TODO_LIST: {
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        }
        case REMOVE_TODO_LIST: {
            // const copyState = {...state};
            // delete copyState[action.payload.todoId];
            // return copyState
            const {[action.payload.todoId]: [], ...rest} = state;
            return rest;
        }
        case SET_TODO_LISTS: {
            const stateCopy = {...state}
            action.payload.todos.forEach((todo: TodolistResponseType) => stateCopy[todo.id] = [])
            return stateCopy
        }
        case SET_TASKS: {
            return {...state, [action.payload.todoId]: action.payload.tasks}
        }
        default:
            return state
    }
}

// ACTION CREATORS

export const removeTaskAC = (id: string, todoId: string) => ({
        type: removeTaskAD,
        payload: {
            id,
            todoId
        }
    } as const
)

export const addTaskAC = (taskName: string, todoId: string) => ({
        type: addTaskAD,
        payload: {
            todoId,
            taskName
        }
    } as const
)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoId: string) => ({
        type: updateTaskAD,
        payload: {
            model,
            taskId,
            todoId
        }
    } as const
)

export const setTasksAC = (todoId: string, tasks: TaskType[]) => ({
        type: SET_TASKS,
        payload: {
            tasks,
            todoId
        }
    } as const
)

//THUNK CREATORS

export const getTasksTC = (todoId: string) => (dispatch: Dispatch<AppActionType>) => {
    tasksApi.getTasksApi(todoId)
        .then(response => {
            dispatch(setTasksAC(todoId, response.data.items))
        })
}

export const deleteTasksTC = (taskId: string, todoId: string) => (dispatch: Dispatch<AppActionType>) => {
    tasksApi.deleteTaskApi(todoId, taskId)
        .then(response => {
            dispatch(removeTaskAC(taskId, todoId))
        })
}

export const addTasksTC = (taskTitle: string, todoId: string) => (dispatch: Dispatch<AppActionType>) => {
    tasksApi.createTaskApi(todoId, taskTitle)
        .then(response => {
            dispatch(addTaskAC(response.data.data.item.title, todoId))
        })
}

export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todoId: string) =>
    (dispatch: Dispatch<AppActionType>, getState: () => AppRootStateType) => {

        const tasks = getState().tasks
        const task = tasks[todoId].find(t => t.id === taskId)

        if (task) {
            const apiModel: UpdateDomainTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                status: task.status,
                ...model
            }
            tasksApi.updateTaskApi(todoId, taskId, apiModel)
                .then(response => {
                    dispatch(updateTaskAC(taskId, model, todoId))
                })
        }
    }
