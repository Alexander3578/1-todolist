import {combineReducers, legacy_createStore} from 'redux';
import {taskReducer} from './reducers/tasks-reducer';
import {todolistReducer} from './reducers/todolists-reducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todoList: todolistReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;