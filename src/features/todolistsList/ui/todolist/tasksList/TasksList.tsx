import React from "react";
import { TaskStatuses, TaskType } from "features/todolistsList/api/tasks-api/tasksApi.types";
import { Task } from "features/todolistsList/ui/todolist/tasksList/task/Task";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";
import { useAppSelector } from "common/hooks/hooks";
import { TaskStateType } from "features/todolistsList/model/tasks/tasksSlice";
import { tasksSelector } from "features/todolistsList/model/tasks/TasksSelector";

type Props = {
  todoList: TodolistType;
};

export const TasksList = ({ todoList }: Props) => {
  const tasks = useAppSelector<TaskStateType>(tasksSelector);

  const filteredTasks: TaskType[] =
    todoList.filter === "active"
      ? tasks[todoList.id].filter((task: TaskType) => task.status === TaskStatuses.New || task.status === TaskStatuses.InProgress)
      : todoList.filter === "completed"
        ? tasks[todoList.id].filter((task: TaskType) => task.status === TaskStatuses.Completed)
        : tasks[todoList.id];

  return tasks[todoList.id].length ? (
    <ul>
      {filteredTasks?.map((task: TaskType) => {
        return <Task key={task.id} todoId={todoList.id} task={task} />;
      })}
    </ul>
  ) : (
    <span>Your list is empty!</span>
  );
};
