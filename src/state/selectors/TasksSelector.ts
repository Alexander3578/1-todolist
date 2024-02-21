import { AppRootStateType } from "../store";
import { TaskStateType } from "app/AppWithRedux";

export const tasksSelector = (state: AppRootStateType): TaskStateType => state.tasks;
