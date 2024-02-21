import React, { useEffect, useState } from "react";
import { api } from "common/api/api";

export default {
  title: "API/TASK API",
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    api.tasksApi.getTasksApi("b3f33266-dfc5-461a-bd64-f66d58a158e5").then((response) => {
      setState(response.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    api.tasksApi.createTaskApi("b3f33266-dfc5-461a-bd64-f66d58a158e5", "Task 3").then((response) => {
      setState(response.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    api.tasksApi
      .deleteTaskApi({ todoId: "3158577f-970f-4fc7-8ae2-bbf3ef466ac8", taskId: "25fc7e89-fc46-432b-b889-d7b922133871" })
      .then((response) => {
        setState(response.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    api.tasksApi
      .updateTaskApi("b3f33266-dfc5-461a-bd64-f66d58a158e5", "3207c195-20c3-47d3-9e67-0be9da5b4b64", { title: "Task 2" })
      .then((response) => {
        setState(response.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
