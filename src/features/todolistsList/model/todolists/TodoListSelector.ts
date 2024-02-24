import { AppRootStateType } from "app/store";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";

export const todoListSelector = (state: AppRootStateType): TodolistType[] => state.todoList;
