import React, { useCallback } from "react";
import { UniversalCheckbox } from "common/components/checkbox/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import { TaskStatuses, TaskType } from "features/todolistsList/api/tasks-api/tasksApi.types";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksSlice";
import { useAppDispatch } from "common/hooks/hooks";
import s from "features/todolistsList/ui/todolist/tasksList/task/Task.module.css";

type Props = {
  task: TaskType;
  todoId: string;
};

export const Task = React.memo(({ task, todoId }: Props) => {
  const dispatch = useAppDispatch();

  const changeTaskStatusHandler = useCallback(
    (taskId: string, currentChecked: boolean) =>
      dispatch(
        tasksThunk.updateTask({
          taskId,
          model: { status: currentChecked ? TaskStatuses.Completed : TaskStatuses.InProgress },
          todoId,
        }),
      ),
    [dispatch, todoId],
  );

  const updateTaskTitleHandler = useCallback(
    (taskId: string, newTitle: string) =>
      dispatch(
        tasksThunk.updateTask({
          taskId,
          model: { title: newTitle },
          todoId: todoId,
        }),
      ),
    [dispatch, todoId],
  );

  const removeTaskHandler = (taskId: string) => {
    dispatch(tasksThunk.deleteTasks({ taskId, todoId }));
  };

  return (
    <li key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <UniversalCheckbox status={task.status} callback={(currentChecked) => changeTaskStatusHandler(task.id, currentChecked)} />
      <EditableSpan oldTitle={task.title} callBack={(title) => updateTaskTitleHandler(task.id, title)} />
      <IconButton onClick={() => removeTaskHandler(task.id)} aria-label="delete" size="small">
        <Delete fontSize="inherit" />
      </IconButton>
    </li>
  );
});
