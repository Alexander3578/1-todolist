import React, {useState} from 'react'
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from './Todolist';

const todoListTitle: string = 'What to learn';

export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {title: 'CSS', id: v1(), isDone: true},
        {title: 'JS', id: v1(), isDone: false},
        {title: 'React', id: v1(), isDone: true},
    ])

    const removeTask = (id: string):void => {
        const tasksAfterRemoving: TaskType[] = tasks.filter((task: TaskType) => task.id !== id)
        setTasks(tasksAfterRemoving)
    }

    const addTask = (newTask: string):void => {
        if(newTask)
        setTasks([{title: newTask, id: v1(), isDone: false}, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeFilter = (newFilterValue: FilterValuesType):void => {
        setFilter(newFilterValue);
    }

    const filteredTasks: TaskType[] = (filter === 'active' ?
        tasks.filter((task: TaskType) => !task.isDone) :
        filter === 'completed' ?
        tasks.filter((task: TaskType) => task.isDone) :
        tasks)

    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
