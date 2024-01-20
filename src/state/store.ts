import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {taskReducer, TasksActionType} from './reducers/tasks-reducer';
import {TodoActionType, todolistReducer} from './reducers/todolists-reducer';
import {thunk, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todoList: todolistReducer
})

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppActionType = TodoActionType | TasksActionType
// @ts-ignore
window.store = store;