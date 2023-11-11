import React, {useState} from 'react'
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './Todolist';


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

    const removeTask = (id: string, todoId: string): void =>
        setTasks({...tasks, [todoId] : tasks[todoId].filter(task => task.id !== id)});


    const addTask = (newTask: string, todoId: string): void =>
        setTasks({...tasks, [todoId]: [...tasks[todoId], {title: newTask, id: v1(), isDone: false}]});


    // const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeFilter = (newFilterValue: FilterValuesType, todoId: string): void =>
        setTodoLists(todoLists.map(todo => todo.id === todoId ? {...todo, filter: newFilterValue} : todo));


    const changeTaskStatus = (id: string, isDone: boolean, todoId: string) =>
       setTasks({...tasks, [todoId]: tasks[todoId].map(task => task.id === id ? {...task, isDone} : task)});

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoId));
        delete tasks[todoId]
    }

    return (
        <div className="App">
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
                                     removeTodoList ={removeTodoList}/>
                })
            }
        </div>
    );
}

export default App;
