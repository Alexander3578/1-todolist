import React, {useState} from 'react'
import './App.css';
import {Todolist} from './Todolist';

const todoListTitle: string = 'What to learn';

export type TaskType = {
    title: string,
    id: number,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {title: 'CSS', id: 1, isDone: true},
        {title: 'JS', id: 2, isDone: false},
        {title: 'React', id: 3, isDone: true},
    ])

    const removeTask = (id: number) => {
        const tasksAfterRemoving: TaskType[] = tasks.filter((task: TaskType) => task.id !== id)
        setTasks(tasksAfterRemoving)
    }

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeFilter = (newFilterValue: FilterValuesType) => {
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
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
