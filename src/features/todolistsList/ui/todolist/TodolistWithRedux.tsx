import React, { memo, useCallback, useEffect } from "react";
import { AddItems } from "common/components/addItems/AddItems";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksSlice";
import { useAppDispatch } from "common/hooks/hooks";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";
import { FilterTasksButtons } from "features/todolistsList/ui/todolist/filterTasksButtons/FilterTasksButtons";
import { TasksList } from "features/todolistsList/ui/todolist/tasksList/TasksList";
import { TaskTitle } from "features/todolistsList/ui/todolist/taskTitle/TaskTitle";

type Props = {
  todoList: TodolistType;
};

export const TodolistWithRedux: React.FC<Props> = memo(({ todoList }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunk.getTasks(todoList.id));
  }, []);

  const addTaskHandler = useCallback(
    (newTask: string) => {
      return dispatch(tasksThunk.addTasks({ taskTitle: newTask, todoId: todoList.id })).unwrap();
    },
    [todoList.id, dispatch],
  );

  return (
    <div>
      <TaskTitle todoList={todoList} />

      <AddItems callBack={addTaskHandler} disabledMoment={todoList.entityStatus === "loading"} />

      <TasksList todoList={todoList} />

      <FilterTasksButtons todoList={todoList} />
    </div>
  );
});
