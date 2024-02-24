import { appActions, RequestStatus } from "app/appSlice";
import { api } from "common/api/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTodoAndTasks } from "common/common.actions";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { ResultCode } from "features/todolistsList/model/tasks/tasksSlice";
import {
  FilterValuesType,
  TodolistResponseType,
  TodolistType,
} from "features/todolistsList/api/todolists-api/todolistsApi.types";

//REDUCER
const slice = createSlice({
  name: "todoList",
  initialState: [] as TodolistType[],
  reducers: {
    changeTodoListFilter: (state, action: PayloadAction<{ todoId: string; newFilterValue: FilterValuesType }>) => {
      const todoList = state.find((todo) => todo.id === action.payload.todoId);
      if (todoList) todoList.filter = action.payload.newFilterValue;
    },
    updateTodoEntityStatus: (state, action: PayloadAction<{ entityStatus: RequestStatus; todoId: string }>) => {
      const todoListIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
      if (todoListIndex !== -1) state[todoListIndex].entityStatus = action.payload.entityStatus;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(clearTodoAndTasks, (state, action) => {
        return action.payload.todolists;
      })
      .addCase(getTodoLists.fulfilled, (state, action) => {
        action.payload.todos.forEach((todo) =>
          state.push({
            ...todo,
            filter: "all",
            entityStatus: "idle",
          }),
        );
      })
      .addCase(removeTodoList.fulfilled, (state, action) => {
        const todoListIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
        if (todoListIndex !== -1) state.splice(todoListIndex, 1);
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        });
      })
      .addCase(changeTodoListTitle.fulfilled, (state, action) => {
        const todoListIndex = state.findIndex((todo) => todo.id === action.payload.todoId);
        if (todoListIndex !== -1) state[todoListIndex].title = action.payload.newTodoTitle;
      });
  },
});

//THUNK CREATORS

export const getTodoLists = createAppAsyncThunk<{
  todos: TodolistResponseType[];
}>(`${slice.name}/getTodoLists`, async () => {
  const response = await api.todolistsApi.getTodoApi();
  return { todos: response.data };
});

export const removeTodoList = createAppAsyncThunk<{ todoId: string }, string>(
  `${slice.name}/removeTodoList`,
  async (todoId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    dispatch(todolistActions.updateTodoEntityStatus({ entityStatus: "loading", todoId }));

    const response = await api.todolistsApi.deleteTodoApi(todoId);
    if (response.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todoId: todoId };
    } else {
      // handleServerAppError(dispatch, response.data);
      return rejectWithValue(response.data);
    }
  },
);

export const addTodoList = createAppAsyncThunk<{ todolist: TodolistResponseType }, string>(
  `${slice.name}/addTodoList`,
  async (title, { dispatch, rejectWithValue }) => {
    const response = await api.todolistsApi.createTodoApi(title);

    if (response.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(appActions.setAppError({ error: null }));
      return { todolist: response.data.data.item };
    } else {
      // handleServerAppError(dispatch, response.data, false);
      //теперь в addMatches
      return rejectWithValue(response.data);
    }
  },
);

export const changeTodoListTitle = createAppAsyncThunk<
  { todoId: string; newTodoTitle: string },
  { title: string; todoId: string }
>(`${slice.name}/changeTodoListTitle`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  const response = await api.todolistsApi.updateTodoApi(arg.todoId, arg.title);
  if (response.data.resultCode === ResultCode.SUCCEEDED) {
    dispatch(appActions.setAppError({ error: null }));
    return { todoId: arg.todoId, newTodoTitle: arg.title };
  } else {
    // handleServerAppError(dispatch, response.data);
    return rejectWithValue(null);
  }
});

export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunk = { getTodoLists, removeTodoList, addTodoList, changeTodoListTitle };
