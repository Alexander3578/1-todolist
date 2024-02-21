import { UnknownAction } from "redux";
import { taskReducer } from "state/reducers/tasksSlice";
import { todolistReducer } from "state/reducers/todolistsSlice";
import { ThunkDispatch } from "redux-thunk";
import { appReducer } from "state/reducers/appSlice";
import { authReducer } from "state/reducers/authSlice";
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
