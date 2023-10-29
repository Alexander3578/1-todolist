import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id:string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (newTask: string) => void
    changeTaskStatus: (id:string, idDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist:React.FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, ...restProps} = props

    const tasksList:Array<JSX.Element> = tasks.map((task:TaskType) => {

        const onClickRemoveTaskHandler = ():void => {
            removeTask(task.id);
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>):void => {
            let currentChecked = e.currentTarget.checked;
            changeTaskStatus(task.id, currentChecked);
        }

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>X</button>
            </li>
        )
    })

    const [newTask, setNewTask] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onChangeNewTaskHandler = (event: ChangeEvent<HTMLInputElement>):void => setNewTask(event.currentTarget.value);

    const onClickNewTaskHandler = () => {
        if(newTask.trim()) {
            addTask(newTask.trim());
            setNewTask('');
        } else setError('You need to write something!')
    }

    const onClickEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>):void => {
        setError(null)
        if(event.key === 'Enter'){
            addTask(newTask);
            setNewTask('');
        }
    }

    // const noSymbolsHandler:boolean | JSX.Element =
    //     !newTask.trim().length && <p style={{color: 'red'}}>You need to write something!</p>

    const tooMuchSymbolsHandler:boolean | JSX.Element =
        newTask.trim().length > 15 && <p style={{color: 'red'}}>You've wrote too much symbols!</p>

    const disabledCondition:boolean = !newTask.trim().length || newTask.trim().length > 15;

    const onClickSetAllFilterHandler = ():void => {changeFilter('all');}
    const onClickSetCompletedFilterHandler = ():void => {changeFilter('completed');}
    const onClickSetActiveFilterHandler = ():void => {changeFilter('active');}

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeNewTaskHandler}
                       onKeyDown={onClickEnterHandler}
                       value={newTask}
                       className={error ? 'error' : ''}/>
                <button disabled={disabledCondition}
                        onClick={onClickNewTaskHandler}>+</button>
                {error && <p className='error-message'>You need to write something!</p>}
                {tooMuchSymbolsHandler}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={restProps.filter === 'all' ? 'active-filter' : ''}
                        onClick={onClickSetAllFilterHandler}>All</button>
                <button className={restProps.filter === 'active' ? 'active-filter' : ''}
                        onClick={onClickSetActiveFilterHandler}>Active</button>
                <button className={restProps.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickSetCompletedFilterHandler}>Completed</button>
            </div>
        </div>
    );
};

