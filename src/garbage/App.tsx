import React, {useState} from 'react'
import {v1} from 'uuid';
import '../app/App.css';
import {Todolist} from './Todolist';
import {AddItems} from '../compomemts/addItems/AddItems';
import ButtonAppBar from '../compomemts/buttonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/tasks-api/tasks-api';
import {FilterValuesType, TodolistType} from '../api/todolists-api/todolists-api';


export type TaskStateType = {
    [key: string]: TaskType[]
}
function App() {

    const todoIdOne = v1();
    const todoIdTwo = v1();

    let [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todoIdOne, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoIdTwo, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoIdOne]: [
            {title: 'CSS', id: v1(), status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: todoIdOne, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'JS', id: v1(), status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: todoIdOne, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'React', id: v1(), status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: todoIdOne, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Rest API', id: v1(), status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: todoIdOne, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'SQL', id: v1(), status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: todoIdOne, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        ],
        [todoIdTwo]: [
            {title: 'Milk', id: v1(), status: TaskStatuses.Completed, order: 0, addedDate: '',
        todoListId: todoIdTwo, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Cheese', id: v1(), status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: todoIdTwo, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Porridge', id: v1(), status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: todoIdTwo, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Eggs', id: v1(), status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: todoIdTwo, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Protein', id: v1(), status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: todoIdTwo, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        ]
    })

    const removeTask = (todoId: string, id: string): void => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(task => task.id !== id)});
    }

    const addTask = (todoId: string, newTask: string): void =>
        setTasks({...tasks, [todoId]: [...tasks[todoId], {title: newTask, id: v1(), status: TaskStatuses.New, order: 0, addedDate: '', todoListId: todoId, description: '', deadline: '', startDate: '', priority: TaskPriorities.Low}]});

    const changeFilter = (todoId: string, newFilterValue: FilterValuesType): void =>
        setTodoLists(todoLists.map(todo => todo.id === todoId ? {...todo, filter: newFilterValue} : todo));

    const changeTaskStatus = (todoId: string, id: string, status: TaskStatuses) =>
        setTasks({...tasks, [todoId]: tasks[todoId].map(task => task.id === id ? {...task, status} : task)});

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoId));
        delete tasks[todoId]
    }

    const addTodoList = (todoName: string) => {
        const todoListId = v1();
        setTodoLists([{id: todoListId, title: todoName, filter: 'all', addedDate: '', order: 0}, ...todoLists])
        setTasks({...tasks, [todoListId]: []})
    }

    const updateTask = (todoId: string, taskId: string, newTaskTitle: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => (t.id === taskId ? {...t, title: newTaskTitle} : t))})
    }

    const updateTodo = (todoId: string, newTodoTitle: string) => {
        setTodoLists(todoLists.map(todo => (todo.id === todoId ? {...todo, title: newTodoTitle} : todo)))
    }

    return (
        <div className="App">
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

export default App;
