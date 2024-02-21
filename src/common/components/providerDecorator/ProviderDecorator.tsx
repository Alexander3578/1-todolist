import React from "react";
import { Provider } from "react-redux";
import { combineReducers, legacy_createStore } from "redux";
import { taskReducer } from "state/reducers/tasksSlice";
import { todolistReducer } from "state/reducers/todolistsSlice";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "common/api/tasks-api/tasks-api";

const rootReducer = combineReducers({
  todoList: todolistReducer,
  tasks: taskReducer,
});

const initialGlobalState: ReturnType<typeof rootReducer> = {
  todoList: [
    {
      id: "todoIdOne",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: "todoIdTwo",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ],
  tasks: {
    ["todoIdOne"]: [
      {
        title: "CSS",
        id: v1(),
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
        id: v1(),
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
        id: v1(),
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
        id: v1(),
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
        id: v1(),
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
    ["todoIdTwo"]: [
      {
        title: "Milk",
        id: v1(),
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
        id: v1(),
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
        id: v1(),
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
        id: v1(),
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
        id: v1(),
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
  },
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as ReturnType<typeof rootReducer>);

export const ProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
