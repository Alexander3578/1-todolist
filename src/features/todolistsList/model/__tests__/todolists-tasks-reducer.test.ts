import { todolistReducer, todolistThunk } from "features/todolistsList/model/todolists/todolistsSlice";
import { taskReducer, TaskStateType } from "features/todolistsList/model/tasks/tasksSlice";
import { v1 } from "uuid";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";

test("ids should be equals", () => {
  const startTasksState: TaskStateType = {};
  const startTodoState: TodolistType[] = [];

  const action = todolistThunk.addTodoList.fulfilled(
    {
      todolist: { id: v1(), title: "What to learn", addedDate: "", order: 0 },
    },
    "requestId",
    "todoId",
  );

  const endTaskState = taskReducer(startTasksState, action);
  const endTodoState = todolistReducer(startTodoState, action);

  const keys = Object.keys(endTaskState);
  const idFromTask = keys[0];
  const idFromTodo = endTodoState[0].id;

  expect(idFromTask).toBe(action.payload.todolist.id);
  expect(idFromTodo).toBe(action.payload.todolist.id);
  expect(idFromTask).toEqual(idFromTodo);
});
