import React, { memo, useCallback, useEffect } from "react";
import { AddItems } from "common/components/addItems/AddItems";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { tasksThunk } from "state/reducers/tasksSlice";
import { todolistActions, todolistThunk } from "state/reducers/todolistsSlice";
import { tasksSelector } from "state/selectors";
import { FilterButton } from "common/components/filterButton/FilterButton";
import { Task } from "./task/Task";
import { TaskStatuses, TaskType } from "common/api/tasks-api/tasks-api";
import { TodolistType } from "common/api/todolists-api/todolists-api";
import { TaskStateType } from "app/AppWithRedux";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";

type TodolistPropsType = {
  todoList: TodolistType;
};

export const TodolistWithRedux: React.FC<TodolistPropsType> = memo(({ todoList }: TodolistPropsType) => {
  const tasks = useAppSelector<TaskStateType>(tasksSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunk.getTasks(todoList.id));
  }, []);

  const filteredTasks: TaskType[] =
    todoList.filter === "active"
      ? tasks[todoList.id].filter((task: TaskType) => task.status === TaskStatuses.New || task.status === TaskStatuses.InProgress)
      : todoList.filter === "completed"
        ? tasks[todoList.id].filter((task: TaskType) => task.status === TaskStatuses.Completed)
        : tasks[todoList.id];

  const onClickSetAllFilterHandler = useCallback(
    () => dispatch(todolistActions.changeTodoListFilter({ todoId: todoList.id, newFilterValue: "all" })),
    [todoList.id, dispatch],
  );

  const onClickSetCompletedFilterHandler = useCallback(
    () => dispatch(todolistActions.changeTodoListFilter({ todoId: todoList.id, newFilterValue: "completed" })),
    [dispatch, todoList.id],
  );

  const onClickSetActiveFilterHandler = useCallback(
    () => dispatch(todolistActions.changeTodoListFilter({ todoId: todoList.id, newFilterValue: "active" })),
    [dispatch, todoList.id],
  );

  const onClickRemoveTodoListHandler = useCallback(
    () => dispatch(todolistThunk.removeTodoList(todoList.id)),
    [dispatch, todoList.id],
  );

  const addTaskHandler = useCallback(
    (newTask: string) => dispatch(tasksThunk.addTasks({ taskTitle: newTask, todoId: todoList.id })),
    [todoList.id, dispatch],
  );

  const updateTodoHandler = useCallback(
    (newTitle: string) => dispatch(todolistThunk.changeTodoListTitle({ title: newTitle, todoId: todoList.id })),
    [dispatch, todoList.id],
  );

  const updateTaskTitleHandler = useCallback(
    (taskId: string, newTitle: string) =>
      dispatch(
        tasksThunk.updateTask({
          taskId,
          model: { title: newTitle },
          todoId: todoList.id,
        }),
      ),
    [dispatch, todoList.id],
  );

  const onChangeTaskStatusHandler = useCallback(
    (taskId: string, currentChecked: boolean) =>
      dispatch(tasksThunk.updateTask({ taskId, model: { status: currentChecked ? 2 : 1 }, todoId: todoList.id })),
    [dispatch, todoList.id],
  );

  const onClickRemoveTaskHandler = useCallback(
    (taskId: string) => dispatch(tasksThunk.deleteTasks({ taskId, todoId: todoList.id })),
    [dispatch, todoList.id],
  );

  const tasksList: Array<JSX.Element> | JSX.Element = tasks[todoList.id].length ? (
    <ul>
      {filteredTasks?.map((task: TaskType) => {
        return (
          <Task
            key={task.id}
            task={task}
            onChangeTaskStatusHandler={onChangeTaskStatusHandler}
            updateTaskTitleHandler={updateTaskTitleHandler}
            onClickRemoveTaskHandler={onClickRemoveTaskHandler}
          />
        );
      })}
    </ul>
  ) : (
    <span>Your list is empty!</span>
  );

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={todoList.title} callBack={updateTodoHandler} />
        <IconButton
          onClick={onClickRemoveTodoListHandler}
          aria-label="delete"
          size="medium"
          disabled={todoList.entityStatus === "loading"}
        >
          <Delete fontSize="inherit" />
        </IconButton>
      </h3>

      <AddItems callBack={addTaskHandler} disabledMoment={todoList.entityStatus === "loading"} />
      {tasksList}

      <div>
        <FilterButton
          color="primary"
          variant={todoList.filter === "all" ? "contained" : "outlined"}
          onClick={onClickSetAllFilterHandler}
        >
          All
        </FilterButton>
        <FilterButton
          color="secondary"
          variant={todoList.filter === "active" ? "contained" : "outlined"}
          onClick={onClickSetActiveFilterHandler}
        >
          Active
        </FilterButton>
        <FilterButton
          color="error"
          variant={todoList.filter === "completed" ? "contained" : "outlined"}
          onClick={onClickSetCompletedFilterHandler}
        >
          Completed
        </FilterButton>
      </div>
    </div>
  );
});
