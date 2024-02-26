import { appActions } from "app/appSlice";
import { api } from "common/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { todolistThunk } from "features/todolistsList/model/todolists/todolistsSlice";
import { clearTodoAndTasks } from "common/common.actions";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import {
  DeleteTaskArgs,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskArgs,
} from "features/todolistsList/api/tasks-api/tasksApi.types";

//TYPES
export enum ResultCode {
  SUCCEEDED = 0,
  FAILED = 1,
  RECAPTCHA = 10,
}

export type TaskStateType = Record<string, TaskType[]>;

export type UpdateDomainTaskModelType = {
  description?: string | null;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string | null;
  deadline?: string | null;
};

//REDUCER
const slice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  selectors: {},
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(todolistThunk.addTodoList.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(clearTodoAndTasks.type, () => {
        return {};
      })
      .addCase(todolistThunk.removeTodoList.fulfilled, (state, action) => {
        delete state[action.payload.todoId];
      })
      .addCase(todolistThunk.getTodoLists.fulfilled, (state, action) => {
        action.payload.todos.forEach((todo) => {
          state[todo.id] = [];
        });
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state[action.payload.todoId].unshift({
          ...action.payload.task,
        });
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const taskIndex = state[action.payload.todoId].findIndex((task) => task.id === action.payload.taskId);

        if (taskIndex !== -1)
          state[action.payload.todoId][taskIndex] = {
            ...state[action.payload.todoId][taskIndex],
            ...action.payload.model,
          };
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        const taskIndex = state[action.payload.todoId].findIndex((task) => task.id === action.payload.taskId);
        if (taskIndex !== -1) state[action.payload.todoId].splice(taskIndex, 1);
      });
  },
});

//THUNK CREATORS
const getTasks = createAppAsyncThunk<
  {
    todoId: string;
    tasks: TaskType[];
  },
  string
>(`${slice.name}/getTasks`, async (todoId, thunkAPI) => {
  const response = await api.tasksApi.getTasksApi(todoId);
  return { todoId, tasks: response.data.items };
});

const deleteTasks = createAppAsyncThunk<DeleteTaskArgs, DeleteTaskArgs>(
  `${slice.name}/deleteTasks`,
  async (arg, { rejectWithValue }) => {
    const response = await api.tasksApi.deleteTaskApi(arg);
    if (response.data.resultCode === ResultCode.SUCCEEDED) {
      return arg;
    } else {
      // handleServerAppError(dispatch, response.data);
      return rejectWithValue(response.data);
    }
  },
);

const addTasks = createAppAsyncThunk<{ task: TaskType; todoId: string }, { taskTitle: string; todoId: string }>(
  `${slice.name}/addTasks`,
  async (arg, { rejectWithValue }) => {
    const response = await api.tasksApi.createTaskApi(arg.todoId, arg.taskTitle);
    if (response.data.resultCode === ResultCode.SUCCEEDED) {
      return { task: response.data.data.item, todoId: arg.todoId };
    } else {
      // handleServerAppError(dispatch, response.data, false);
      return rejectWithValue(response.data);
    }
  },
);

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, { dispatch, rejectWithValue, getState }) => {
    const tasks = getState().tasks;
    const task = tasks[arg.todoId].find((t) => t.id === arg.taskId);

    if (!task) {
      return rejectWithValue(null);
    }

    const apiModel: UpdateDomainTaskModelType = {
      title: task.title,
      startDate: task.startDate,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      status: task.status,
      ...arg.model,
    };

    const response = await api.tasksApi.updateTaskApi(arg.todoId, arg.taskId, apiModel);
    if (response.data.resultCode === ResultCode.SUCCEEDED) {
      dispatch(appActions.setAppError({ error: null }));
      return arg;
    } else {
      // handleServerAppError(dispatch, response.data);
      return rejectWithValue(response.data);
    }
  },
);

export const taskReducer = slice.reducer;
export const taskAction = slice.actions;
export const tasksThunk = { getTasks, addTasks, updateTask, deleteTasks };
