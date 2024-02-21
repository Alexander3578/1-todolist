import React, { useEffect, useState } from "react";
import { api } from "common/api/api";

export default {
  title: "API/TODO API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    api.todolistsApi.getTodoApi().then((response) => {
      setState(response.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    api.todolistsApi.createTodoApi("TODO-LESSON-TRAINING").then((response) => {
      setState(response.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    api.todolistsApi.deleteTodoApi("3266bcd4-96e4-4e32-ac39-f4d362ab203f").then((response) => {
      setState(response.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    api.todolistsApi.updateTodoApi("b3f33266-dfc5-461a-bd64-f66d58a158e5", "NEW WOMAN").then((response) => {
      setState(response.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
