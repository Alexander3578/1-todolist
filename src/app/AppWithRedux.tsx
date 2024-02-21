import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import ButtonAppBar from "../common/components/buttonAppBar/ButtonAppBar";
import { TaskType } from "common/api/tasks-api/tasks-api";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { TodoListsList } from "features/todolistsList/TodoListLists";
import LinearProgress from "@mui/material/LinearProgress";
import CustomizedSnackbars from "../common/components/errorSnackbar/ErrorSanckbar";
import { Login } from "features/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { authThunk } from "state/reducers/authSlice";
import { CircularProgress } from "@mui/material";
import { isInizialisedSelector, statusSelector } from "state/selectors/AppSelectors";

export type TaskStateType = {
  [key: string]: TaskType[];
};

export function AppWithRedux() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(statusSelector);
  const isInizialised = useAppSelector(isInizialisedSelector);

  useEffect(() => {
    dispatch(authThunk.authMe());
  }, []);

  return isInizialised ? (
    <div>
      <CustomizedSnackbars />
      <ButtonAppBar />
      {status === "loading" && <LinearProgress />}

      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodoListsList />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/404"} element={<h1>404. Page not found</h1>} />
          <Route path={"/*"} element={<Navigate to={"/403"} />} />
        </Routes>
      </Container>
    </div>
  ) : (
    <div
      style={{
        position: "fixed",
        textAlign: "center",
        width: "100%",
        top: "30%",
      }}
    >
      <CircularProgress />
    </div>
  );
}
