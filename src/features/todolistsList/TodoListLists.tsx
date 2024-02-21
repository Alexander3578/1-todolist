import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { TodolistType } from "common/api/todolists-api/todolists-api";
import { todoListSelector } from "state/selectors";
import { todolistThunk } from "state/reducers/todolistsSlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TodolistWithRedux } from "./todolist/TodolistWithRedux";
import { AddItems } from "common/components/addItems/AddItems";
import { isLoggedSelector } from "state/selectors/AuthSelectors";
import { Navigate } from "react-router-dom";

type TodoListsListPropsType = {};

export const TodoListsList: React.FC<TodoListsListPropsType> = (props) => {
  const todoLists = useAppSelector<TodolistType[]>(todoListSelector);
  const isLogged = useAppSelector<boolean>(isLoggedSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogged) dispatch(todolistThunk.getTodoLists());
  }, []);

  const addTodoList = useCallback(
    (todoName: string) => {
      dispatch(todolistThunk.addTodoList(todoName));
    },
    [dispatch],
  );

  if (!isLogged) return <Navigate to={"/login"} />;

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItems callBack={addTodoList} />
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
