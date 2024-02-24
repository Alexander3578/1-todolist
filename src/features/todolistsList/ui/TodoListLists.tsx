import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { todoListSelector } from "common/selectors";
import { todolistThunk } from "features/todolistsList/model/todolists/todolistsSlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TodolistWithRedux } from "features/todolistsList/ui/todolist/TodolistWithRedux";
import { AddItems } from "common/components/addItems/AddItems";
import { isLoggedSelector } from "features/login/model/AuthSelectors";
import { Navigate } from "react-router-dom";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";

export const TodoListsList: React.FC = () => {
  const todoLists = useAppSelector<TodolistType[]>(todoListSelector);
  const isLogged = useAppSelector<boolean>(isLoggedSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogged) dispatch(todolistThunk.getTodoLists());
  }, []);

  const addTodoListHandler = useCallback(
    (todoName: string) => {
      return dispatch(todolistThunk.addTodoList(todoName)).unwrap();
    },
    [dispatch],
  );

  if (!isLogged) return <Navigate to={"/login"} />;

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItems callBack={addTodoListHandler} />
      </Grid>
      <Grid container>
        {todoLists?.map((todo) => (
          <Paper elevation={3} style={{ padding: "15px", margin: "15px" }}>
            <TodolistWithRedux todoList={todo} />
          </Paper>
        ))}
      </Grid>
    </>
  );
};
