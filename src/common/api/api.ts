import { AuthApi } from "features/login/api/auth-api/auth-api";
import { TasksApi } from "features/todolistsList/api/tasks-api/tasks-api";
import { TodolistsApi } from "features/todolistsList/api/todolists-api/todolists-api";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "d73077ae-433c-4ece-8816-d836252a42fe",
  },
});

export const api = {
  authApi: new AuthApi(instance),
  tasksApi: new TasksApi(instance),
  todolistsApi: new TodolistsApi(instance),
};
