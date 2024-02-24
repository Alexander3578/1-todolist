import { createAction } from "@reduxjs/toolkit";
import { TaskStateType } from "features/todolistsList/model/tasks/tasksSlice";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";

export type ClearTodoAndTasks = {
  tasks: TaskStateType;
  todolists: TodolistType[];
};

export const clearTodoAndTasks = createAction<ClearTodoAndTasks>("common/clear-todolist-tasks");
