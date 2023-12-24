import {TaskStateType} from '../../App';
import {
    ADD_TODO_LIST,
    addTodoListACType,
    REMOVE_TODO_LIST,
    removeTodoListACType,
    todoIdOne,
    todoIdTwo
} from './todolists-reducer';
import {v1} from 'uuid';

const removeTaskAD = 'REMOVE-TASK';
const addTaskAD = 'ADD-TASK';
const changeTaskStatusAD = 'CHANGE-TASK-STATUS';
const changeTaskTitleAD = 'CHANGE-TASK-TITLE';

type TasksReducerType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType
    | addTodoListACType | removeTodoListACType

const initialTaskState:TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialTaskState, action: TasksReducerType): TaskStateType => {
    switch (action.type) {
        case removeTaskAD: {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.id)
            };
        }
        case addTaskAD: {
            return {
                ...state, [action.payload.todoId]: [{
                    title: action.payload.newTaskTitle,
                    id: action.payload.taskId,
                    isDone: false
                },
                    ...state[action.payload.todoId],
                ]
            }
        }
        case changeTaskStatusAD: {
            return {
                ...state, [action.payload.todoId]: state[action.payload.todoId]
                    .map(task => task.id === action.payload.taskId ? {
                        ...task,
                        isDone: action.payload.taskStatus
                    } : task)
            }
        }
        case changeTaskTitleAD: {
            return {
                ...state, [action.payload.todoId]: state[action.payload.todoId]
                    .map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTitle} : task)
            }
        }
        case ADD_TODO_LIST: {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case REMOVE_TODO_LIST: {
            // const copyState = {...state};
            // delete copyState[action.payload.todoId];
            // return copyState
            const {[action.payload.todoId]: [], ...rest} = state;
            return rest;
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string, todoId: string) => {
    return {
        type: removeTaskAD,
        payload: {
            id,
            todoId
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (newTaskTitle: string, todoId: string) => {
    return {
        type: addTaskAD,
        payload: {
            newTaskTitle,
            todoId,
            taskId: v1()
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todoId: string) => {
    return {
        type: changeTaskStatusAD,
        payload: {
            taskStatus,
            taskId,
            todoId
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoId: string) => {
    return {
        type: changeTaskTitleAD,
        payload: {
            newTitle,
            taskId,
            todoId
        }
    } as const
}
