import React from 'react';
import {FilterValuesType, TaskType} from './App';

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}

export const Todolist:React.FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const {title, tasks, removeTask, changeFilter, ...restProps} = props

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

    const onClickSetAllFilterHandler = () => {changeFilter('all');}
    const onClickSetCheckedFilterHandler = () => {changeFilter('completed');}

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onClickSetAllFilterHandler}>All</button>
                <button onClick={() => {changeFilter('active')}}>Active</button>
                <button onClick={onClickSetCheckedFilterHandler}>Completed</button>
            </div>
        </div>
    );
};

