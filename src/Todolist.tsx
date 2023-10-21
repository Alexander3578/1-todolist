import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id:string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (newTask: string) => void
}

export const Todolist:React.FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const {title, tasks, removeTask, changeFilter, addTask, ...restProps} = props

    const tasksList:Array<JSX.Element> = tasks.map((task:TaskType) => {
        const onClickRemoveTaskHandler = () => {
            removeTask(task.id);
        }
        return (
            <li><input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>X</button>
            </li>
        )
    })

    const [newTask, setNewTask] = useState<string>('');

    const onChangeNewTaskHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setNewTask(event.currentTarget.value);

    const onClickNewTaskHandler = () => {
        addTask(newTask);
        setNewTask('');
    }

    const onClickEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            addTask(newTask);
            setNewTask('');
        }
    }

    const onClickSetAllFilterHandler = () => {changeFilter('all');}
    const onClickSetCompletedFilterHandler = () => {changeFilter('completed');}
    const onClickSetActiveFilterHandler = () => {changeFilter('active');}

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeNewTaskHandler} onKeyDown={onClickEnterHandler} value={newTask}/>
                <button onClick={onClickNewTaskHandler}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onClickSetAllFilterHandler}>All</button>
                <button onClick={onClickSetActiveFilterHandler}>Active</button>
                <button onClick={onClickSetCompletedFilterHandler}>Completed</button>
            </div>
        </div>
    );
};

