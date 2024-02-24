import { UnknownAction } from "redux";
import { taskReducer } from "features/todolistsList/model/tasks/tasksSlice";
import { todolistReducer } from "features/todolistsList/model/todolists/todolistsSlice";
import { ThunkDispatch } from "redux-thunk";
import { appReducer } from "app/appSlice";
import { authReducer } from "features/login/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   tasks: taskReducer,
//   todoList: todolistReducer,
//   app: appReducer,
//   auth: authReducer,
// });
// @ts-ignore
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    todoList: todolistReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

// @ts-ignore
window.store = store;
