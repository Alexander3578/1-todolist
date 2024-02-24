import React, { useCallback } from "react";
import { EditableSpan } from "common/components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";
import { todolistActions, todolistThunk } from "features/todolistsList/model/todolists/todolistsSlice";
import { useAppDispatch } from "common/hooks/hooks";

type Props = {
  todoList: TodolistType;
};

export const TaskTitle = ({ todoList }: Props) => {
  const dispatch = useAppDispatch();

  const removeTodoListHandler = () => {
    dispatch(todolistThunk.removeTodoList(todoList.id))
      .unwrap()
      .catch((err) => {
        dispatch(todolistActions.updateTodoEntityStatus({ entityStatus: "failed", todoId: todoList.id }));
      });
  };

  const updateTodoHandler = useCallback(
    (newTitle: string) => dispatch(todolistThunk.changeTodoListTitle({ title: newTitle, todoId: todoList.id })),
    [dispatch, todoList.id],
  );

  return (
    <h3>
      <EditableSpan oldTitle={todoList.title} callBack={updateTodoHandler} />
      <IconButton
        onClick={removeTodoListHandler}
        aria-label="delete"
        size="medium"
        disabled={todoList.entityStatus === "loading"}
      >
        <Delete fontSize="inherit" />
      </IconButton>
    </h3>
  );
};
