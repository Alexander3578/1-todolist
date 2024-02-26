import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodoListsList } from "features/todolistsList/ui/TodoListLists";
import { Login } from "features/login/ui/Login";
import Container from "@mui/material/Container";

export const AppRouteContainer = () => {
  return (
    <Container fixed>
      <Routes>
        <Route path={"/"} element={<TodoListsList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/404"} element={<h1>404. Page not found</h1>} />
        <Route path={"/*"} element={<Navigate to={"/403"} />} />
      </Routes>
    </Container>
  );
};
