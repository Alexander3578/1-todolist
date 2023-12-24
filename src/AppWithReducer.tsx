import React, {Reducer, useReducer} from 'react'
import {v1} from 'uuid';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer
} from './state/reducers/tasks-reducer';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    TodoActionType,
    todolistReducer,
    updateTodoListAC
} from './state/reducers/todolists-reducer';
import {AddItems} from './compomemts/addItems/AddItems';
import {Todolist} from './Todolist';
import ButtonAppBar from './compomemts/buttonAppBar/ButtonAppBar';


export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export function AppWithReducer() {

    const todoIdOne = v1();
    const todoIdTwo = v1();

    let [todoLists, dispatchTodoLists] = useReducer<Reducer<TodoListType[], TodoActionType>>(todolistReducer,[
        {id: todoIdOne, title: 'What to learn', filter: 'all'},
        {id: todoIdTwo, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(taskReducer ,{
        [todoIdOne]: [
            {title: 'CSS', id: v1(), isDone: true},
            {title: 'JS', id: v1(), isDone: false},
            {title: 'React', id: v1(), isDone: true},
            {title: 'Rest API', id: v1(), isDone: false},
            {title: 'SQL', id: v1(), isDone: false},
        ],
        [todoIdTwo]: [
            {title: 'Milk', id: v1(), isDone: false},
            {title: 'Cheese', id: v1(), isDone: false},
            {title: 'Porridge', id: v1(), isDone: true},
            {title: 'Eggs', id: v1(), isDone: true},
            {title: 'Protein', id: v1(), isDone: true},
        ]
    })

    const removeTask = (todoId: string, id: string): void =>
        dispatchTasks(removeTaskAC(id, todoId));

    const addTask = (todoId: string, newTask: string): void =>
        dispatchTasks(addTaskAC(newTask, todoId))

    const changeFilter = (todoId: string, newFilterValue: FilterValuesType): void =>
        dispatchTodoLists(changeTodoListFilterAC(todoId, newFilterValue))

    const changeTaskStatus = (todoId: string, id: string, isDone: boolean) =>
        dispatchTasks(changeTaskStatusAC(id, isDone, todoId))

    const removeTodoList = (todoId: string) => {
        const action = removeTodoListAC(todoId);
        dispatchTasks(action);
        dispatchTodoLists(action);
    }

    const addTodoList = (todoName: string) => {
        const action = addTodoListAC(todoName);
        dispatchTodoLists(action);
        dispatchTasks(action);
    }

    const updateTask = (todoId: string, taskId: string, newTaskTitle: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, newTaskTitle, todoId))
    }

    const updateTodo = (todoId: string, newTodoTitle: string) => {
        dispatchTodoLists(updateTodoListAC(todoId, newTodoTitle))
    }

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItems callBack={addTodoList}/>
                </Grid>
                <Grid container>
                    {
                        todoLists.map(todo => {
                            return <Paper elevation={3} style={{padding: '15px', margin: '15px'}}>
                                <Todolist key={todo.id}
                                          todoId={todo.id}
                                          title={todo.title}
                                          tasks={tasks[todo.id]}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={todo.filter}
                                          removeTodoList={removeTodoList}
                                          updateTask={updateTask}
                                          updateTodo={updateTodo}/>
                            </Paper>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
