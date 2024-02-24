import { AppRootStateType } from "app/store";
import { TaskStateType } from "features/todolistsList/model/tasks/tasksSlice";

export const tasksSelector = (state: AppRootStateType): TaskStateType => state.tasks;
