import { v1 } from "uuid";
import { todolistActions, todolistReducer, todolistThunk } from "features/todolistsList/model/todolists/todolistsSlice";
import { TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";

let todoListId1 = v1();
let todoListId2 = v1();

let startState: TodolistType[] = [
  {
    id: todoListId1,
    title: "What to learn",
    filter: "all",
    addedDate: "",
    order: 0,
    entityStatus: "idle",
  },
  {
    id: todoListId2,
    title: "What to buy",
    filter: "all",
    addedDate: "",
    order: 0,
    entityStatus: "idle",
  },
];

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ];
});

test("correct todoList should be removed", () => {
  const endState = todolistReducer(
    startState,
    todolistThunk.removeTodoList.fulfilled({ todoId: todoListId1 }, "requestId", todoListId1),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("todoList should be add", () => {
  const todoId = v1();
  const endState = todolistReducer(
    startState,
    todolistThunk.addTodoList.fulfilled(
      {
        todolist: { id: todoId, title: "What to sale", addedDate: "", order: 0 },
      },
      "requestId",
      todoId,
    ),
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("What to sale");
});

test("correct todoList should be updated", () => {
  const endState = todolistReducer(
    startState,
    todolistThunk.changeTodoListTitle.fulfilled(
      {
        todoId: todoListId1,
        newTodoTitle: "Updated",
      },
      "requestId",
      { title: "Updated", todoId: todoListId1 },
    ),
  );

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe("Updated");
});

test("change todoList filter", () => {
  const endState = todolistReducer(
    startState,
    todolistActions.changeTodoListFilter({
      todoId: todoListId2,
      newFilterValue: "active",
    }),
  );

  expect(endState.length).toBe(2);
  expect(endState[1].filter).toBe("active");
});
