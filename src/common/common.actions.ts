import { createAction } from "@reduxjs/toolkit";
import { TaskStateType } from "app/AppWithRedux";
import { TodolistType } from "./api/todolists-api/todolists-api";

export type ClearTodoAndTasks = {
  tasks: TaskStateType;
  todolists: TodolistType[];
};

export const clearTodoAndTasks = createAction<ClearTodoAndTasks>("common/clear-todolist-tasks");
