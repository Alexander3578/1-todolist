// import React, { Reducer, useReducer } from "react";
// import { v1 } from "uuid";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import {taskAction, taskReducer, tasksThunk} from 'state/reducers/tasksSlice';
// import { todolistActions, todolistReducer } from "state/reducers/todolistsSlice";
// import { AddItems } from "compomemts/addItems/AddItems";
// import { Todolist } from "./Todolist";
// import ButtonAppBar from "../compomemts/buttonAppBar/ButtonAppBar";
// import { FilterValuesType, TodolistType } from "api/todolists-api/todolists-api";
// import { TaskPriorities, TaskStatuses } from "api/tasks-api/tasks-api";
// import { UnknownAction } from "redux";
// import {AppDispatchType} from '../state/store';
//
// export function AppWithReducer() {
//   const todoIdOne = v1();
//   const todoIdTwo = v1();
//
//   let [todoLists, dispatchTodoLists] = useReducer<Reducer<TodolistType[], any>>(todolistReducer, [
//     {
//       id: todoIdOne,
//       title: "What to learn",
//       filter: "all",
//       addedDate: "",
//       order: 0,
//       entityStatus: "idle",
//     },
//     {
//       id: todoIdTwo,
//       title: "What to buy",
//       filter: "all",
//       addedDate: "",
//       order: 0,
//       entityStatus: "idle",
//     },
//   ]);
//
//   let [tasks, dispatchTasks] = useReducer(taskReducer, {
//     [todoIdOne]: [
//       {
//         title: "CSS",
//         id: v1(),
//         status: TaskStatuses.New,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdOne,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "JS",
//         id: v1(),
//         status: TaskStatuses.New,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdOne,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "React",
//         id: v1(),
//         status: TaskStatuses.New,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdOne,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "Rest API",
//         id: v1(),
//         status: TaskStatuses.Completed,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdOne,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "SQL",
//         id: v1(),
//         status: TaskStatuses.New,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdOne,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//     ],
//     [todoIdTwo]: [
//       {
//         title: "Milk",
//         id: v1(),
//         status: TaskStatuses.Completed,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdTwo,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "Cheese",
//         id: v1(),
//         status: TaskStatuses.New,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdTwo,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "Porridge",
//         id: v1(),
//         status: TaskStatuses.Completed,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdTwo,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "Eggs",
//         id: v1(),
//         status: TaskStatuses.Completed,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdTwo,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//       {
//         title: "Protein",
//         id: v1(),
//         status: TaskStatuses.Completed,
//         order: 0,
//         addedDate: "",
//         todoListId: todoIdTwo,
//         description: "",
//         deadline: "",
//         startDate: "",
//         priority: TaskPriorities.Low,
//       },
//     ],
//   });
//
//   const removeTask = (todoId: string, id: string): void => dispatchTasks(taskAction.removeTask({ taskId: id, todoId }));
//
//   const addTask = (todoId: string, newTask: string): void =>
//     dispatchTasks(
//         tasksThunk.addTasks({taskTitle: newTask, todoId})
//     );
//
//   const changeFilter = (todoId: string, newFilterValue: FilterValuesType): void =>
//     dispatchTodoLists(todolistActions.changeTodoListFilter({ todoId, newFilterValue }));
//
//   const changeTaskStatus = (todoId: string, id: string, status: TaskStatuses) =>
//     dispatchTasks(taskAction.updateTask({ taskId: id, model: { status }, todoId }));
//
//   const removeTodoList = (todoId: string) => {
//     const action = todolistActions.removeTodoList({ todoId });
//     dispatchTasks(action);
//     dispatchTodoLists(action);
//   };
//
//   const addTodoList = (todoName: string) => {
//     const action = todolistActions.addTodoList({ todolist: { id: v1(), title: todoName, addedDate: "", order: 0 } });
//     dispatchTodoLists(action);
//     dispatchTasks(action);
//   };
//
//   const updateTask = (todoId: string, taskId: string, newTaskTitle: string) => {
//     dispatchTasks(taskAction.updateTask({ taskId, model: { title: newTaskTitle }, todoId }));
//   };
//
//   const updateTodo = (todoId: string, newTodoTitle: string) => {
//     dispatchTodoLists(todolistActions.updateTodoList({ todoId, newTodoTitle: newTodoTitle }));
//   };
//
//   return (
//     <div>
//       <ButtonAppBar />
//       <Container fixed>
//         <Grid container style={{ padding: "20px" }}>
//           <AddItems callBack={addTodoList} />
//         </Grid>
//         <Grid container>
//           {todoLists.map((todo) => {
//             return (
//               <Paper elevation={3} style={{ padding: "15px", margin: "15px" }}>
//                 <Todolist
//                   key={todo.id}
//                   todoId={todo.id}
//                   title={todo.title}
//                   tasks={tasks[todo.id]}
//                   removeTask={removeTask}
//                   changeFilter={changeFilter}
//                   addTask={addTask}
//                   changeTaskStatus={changeTaskStatus}
//                   filter={todo.filter}
//                   removeTodoList={removeTodoList}
//                   updateTask={updateTask}
//                   updateTodo={updateTodo}
//                 />
//               </Paper>
//             );
//           })}
//         </Grid>
//       </Container>
//     </div>
//   );
// }
