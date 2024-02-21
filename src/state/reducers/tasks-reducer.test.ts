import { TaskStateType } from "garbage/App";
import { todolistThunk } from "state/reducers/todolistsSlice";
import { taskReducer, tasksThunk } from "state/reducers/tasksSlice";
import { TaskPriorities, TaskStatuses } from "common/api/tasks-api/tasks-api";

let startState: TaskStateType = {
  todoIdOne: [
    {
      title: "CSS",
      id: "1",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdOne",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "JS",
      id: "2",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdOne",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "React",
      id: "3",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdOne",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Rest API",
      id: "4",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdOne",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "SQL",
      id: "5",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdOne",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
  ],
  todoIdTwo: [
    {
      title: "Milk",
      id: "1",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Cheese",
      id: "2",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Porridge",
      id: "3",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Eggs",
      id: "4",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Protein",
      id: "5",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
  ],
};

beforeEach(() => {
  startState = {
    todoIdOne: [
      {
        title: "CSS",
        id: "1",
        status: TaskStatuses.New,
        order: 0,
        addedDate: "",
        todoListId: "todoIdOne",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "JS",
        id: "2",
        status: TaskStatuses.New,
        order: 0,
        addedDate: "",
        todoListId: "todoIdOne",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "React",
        id: "3",
        status: TaskStatuses.New,
        order: 0,
        addedDate: "",
        todoListId: "todoIdOne",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "Rest API",
        id: "4",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todoIdOne",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "SQL",
        id: "5",
        status: TaskStatuses.New,
        order: 0,
        addedDate: "",
        todoListId: "todoIdOne",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
    ],
    todoIdTwo: [
      {
        title: "Milk",
        id: "1",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todoIdTwo",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "Cheese",
        id: "2",
        status: TaskStatuses.New,
        order: 0,
        addedDate: "",
        todoListId: "todoIdTwo",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "Porridge",
        id: "3",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todoIdTwo",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "Eggs",
        id: "4",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todoIdTwo",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        title: "Protein",
        id: "5",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: "",
        todoListId: "todoIdTwo",
        description: "",
        deadline: "",
        startDate: "",
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("correct task should be deleted", () => {
  const action = tasksThunk.deleteTasks.fulfilled({ taskId: "3", todoId: "todoIdTwo" }, "requestId", {
    taskId: "3",
    todoId: "todoIdTwo",
  });

  const endState = taskReducer(startState, action);

  expect(endState["todoIdTwo"]).toEqual([
    {
      title: "Milk",
      id: "1",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Cheese",
      id: "2",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Eggs",
      id: "4",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Protein",
      id: "5",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
  ]);
});

test("correct task should be added to correct array", () => {
  const action = tasksThunk.addTasks.fulfilled(
    {
      task: {
        id: "0",
        title: "juice",
        description: null,
        todoListId: "e7e7fcd3-70ff-4335-8bfe-adb4518533dd",
        order: -2,
        status: 1,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2024-01-07T20:29:39.527",
      },
      todoId: "todoIdTwo",
    },
    "requestId",
    {
      taskTitle: "juice",
      todoId: "todoIdTwo",
    },
  );

  const endState = taskReducer(startState, action);

  expect(endState["todoIdTwo"]).toEqual([
    {
      id: "0",
      title: "juice",
      description: null,
      todoListId: "e7e7fcd3-70ff-4335-8bfe-adb4518533dd",
      order: -2,
      status: 1,
      priority: 1,
      startDate: null,
      deadline: null,
      addedDate: "2024-01-07T20:29:39.527",
    },
    {
      title: "Milk",
      id: "1",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Cheese",
      id: "2",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Porridge",
      id: "3",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Eggs",
      id: "4",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Protein",
      id: "5",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
  ]);
  expect(endState["todoIdTwo"].length).toBe(6);
  expect(endState["todoIdTwo"][0].id).toBeDefined();
  expect(endState["todoIdTwo"][0].title).toBe("juice");
  expect(endState["todoIdTwo"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const action = tasksThunk.updateTask.fulfilled(
    { taskId: "2", model: { status: TaskStatuses.Completed }, todoId: "todoIdTwo" },
    "requiredId",
    { taskId: "2", model: { status: TaskStatuses.Completed }, todoId: "todoIdTwo" },
  );

  const endState = taskReducer(startState, action);

  expect(endState["todoIdTwo"]).toEqual([
    {
      title: "Milk",
      id: "1",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Cheese",
      id: "2",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Porridge",
      id: "3",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Eggs",
      id: "4",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Protein",
      id: "5",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
  ]);
  expect(endState["todoIdTwo"][1].status).toBe(TaskStatuses.Completed);
});

test("title of specified task should be changed", () => {
  const action = tasksThunk.updateTask.fulfilled(
    {
      taskId: "2",
      model: { title: "GRAPES" },
      todoId: "todoIdTwo",
    },
    "requiredId",
    {
      taskId: "2",
      model: { title: "GRAPES" },
      todoId: "todoIdTwo",
    },
  );

  const endState = taskReducer(startState, action);

  expect(endState["todoIdTwo"]).toEqual([
    {
      title: "Milk",
      id: "1",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "GRAPES",
      id: "2",
      status: TaskStatuses.New,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Porridge",
      id: "3",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Eggs",
      id: "4",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
    {
      title: "Protein",
      id: "5",
      status: TaskStatuses.Completed,
      order: 0,
      addedDate: "",
      todoListId: "todoIdTwo",
      description: "",
      deadline: "",
      startDate: "",
      priority: TaskPriorities.Low,
    },
  ]);
  expect(endState["todoIdTwo"][1].title).toBe("GRAPES");
});

test("new array should be added when new todoList is added", () => {
  const endState = taskReducer(
    startState,
    todolistThunk.addTodoList.fulfilled(
      { todolist: { id: "todoIdThree", title: "What to learn", addedDate: "", order: 0 } },
      "requestId",
      "todoIdThree",
    ),
  );

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todoIdOne" && k != "todoIdTwo");

  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolist should be deleted", () => {
  const endState = taskReducer(
    startState,
    todolistThunk.removeTodoList.fulfilled({ todoId: "todoIdTwo" }, "requestId", "todoIdTwo"),
  );

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(keys[0]).toBe("todoIdOne");
  expect(endState["todoIdTwo"]).not.toBeDefined();
});

test("tasks should be added for todoList", () => {
  const endState = taskReducer(
    {
      todoIdOne: [],
      todoIdOTwo: [],
    },
    tasksThunk.getTasks.fulfilled({ todoId: "todoIdOne", tasks: startState["todoIdOne"] }, "", "todoIdOne"),
  );

  expect(endState["todoIdOne"].length).toBe(5);
  expect(endState["todoIdTwo"].length).toBe(0);
});
