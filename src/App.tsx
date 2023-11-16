import React, {useState} from 'react'
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './Todolist';
import {AddItems} from './compomemts/addItems/AddItems';


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

type TaskStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const todoIdOne = v1();
    const todoIdTwo = v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoIdOne, title: 'What to learn', filter: 'all'},
        {id: todoIdTwo, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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
        setTasks({...tasks, [todoId] : tasks[todoId].filter(task => task.id !== id)});

    const addTask = (todoId: string, newTask: string): void =>
        setTasks({...tasks, [todoId]: [...tasks[todoId], {title: newTask, id: v1(), isDone: false}]});

    const changeFilter = (todoId: string, newFilterValue: FilterValuesType): void =>
        setTodoLists(todoLists.map(todo => todo.id === todoId ? {...todo, filter: newFilterValue} : todo));

    const changeTaskStatus = (todoId: string, id: string, isDone: boolean) =>
       setTasks({...tasks, [todoId]: tasks[todoId].map(task => task.id === id ? {...task, isDone} : task)});

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoId));
        delete tasks[todoId]
    }

    const addTodoList = (todoName: string) => {
        const todoListId = v1();
        setTodoLists([{id: todoListId, title: todoName, filter: 'all'}, ...todoLists])
        setTasks({...tasks, [todoListId]:[]})
    }

    const updateTask = (todoId: string, taskId: string, newTaskTitle: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => (t.id === taskId ? {...t, title: newTaskTitle} : t))})
    }

    const updateTodo = (todoId: string, newTodoTitle: string) => {
        setTodoLists(todoLists.map(todo => (todo.id === todoId ? {...todo, title: newTodoTitle} : todo)))
    }

    return (
        <div className="App">
            <AddItems callBack={addTodoList}/>
            {
                todoLists.map(todo => {
                    return <Todolist key={todo.id}
                                     todoId={todo.id}
                                     title={todo.title}
                                     tasks={tasks[todo.id]}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todo.filter}
                                     removeTodoList ={removeTodoList}
                                     updateTask={updateTask}
                                     updateTodo={updateTodo}/>
                })
            }
        </div>
    );
}

export default App;
