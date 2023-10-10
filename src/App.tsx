import React from 'react'
import './App.css';
import {Todolist} from "./Todolist";

export type TaskProps = {
    title: string,
    id: number,
    isDone: boolean
}

const task1 : TaskProps[] = [
    {title: 'CSS', id: 1, isDone: true},
    {title: 'JS', id: 2, isDone: false},
    {title: 'React', id: 3, isDone: true},
]

const task2 : Array<TaskProps> = [
    {title: 'Gucci', id: 1, isDone: false},
    {title: 'Balenciaga', id: 2, isDone: true},
    {title: 'Louis Vuitton', id: 3, isDone: true},
]

function App() {
    return (
        <div className="App">
            <Todolist title = 'What to learn' task={task1}/>
            <Todolist title = 'Style' task={task2}/>
        </div>
    );
}

export default App;
