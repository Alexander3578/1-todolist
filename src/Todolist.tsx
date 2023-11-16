import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItems} from './compomemts/addItems/AddItems';
import {EditableSpan} from './compomemts/editableSpan/EditableSpan';

type TodolistPropsType = {
    title: string,
    todoId: string
    tasks: Array<TaskType>
    removeTask: (todoId: string, id: string) => void
    changeFilter: (todoId: string, newFilterValue: FilterValuesType) => void
    addTask: (todoId: string, newTask: string) => void
    changeTaskStatus: (todoId: string, id: string, idDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoId: string) => void
    updateTask: (todoId: string, taskId: string, newTaskTitle: string) => void
    updateTodo: (todoId: string, newTodoTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    let {title, todoId, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, removeTodoList, updateTask, updateTodo} = props

    const filteredTasks: TaskType[] =
        (filter === 'active' ?
            tasks.filter((task: TaskType) => !task.isDone) :
            filter === 'completed' ?
                tasks.filter((task: TaskType) => task.isDone) :
                tasks)


    const onClickSetAllFilterHandler = (): void => changeFilter(todoId, 'all');
    const onClickSetCompletedFilterHandler = (): void => changeFilter(todoId, 'completed');
    const onClickSetActiveFilterHandler = (): void => changeFilter(todoId, 'active');

    const onClickRemoveTodoListHandler = () => removeTodoList(todoId);
    const addTaskHandler = (newTask: string) => {
        addTask(todoId, newTask);
    }

    const updateTodoHandler = (newTitle: string) => {
        updateTodo(todoId, newTitle)
    }

    const updateTaskHandler = (taskId: string, newTitle: string) => {
            updateTask(todoId, taskId, newTitle);
        }

    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length ?
        <ul>
            {filteredTasks.map((task: TaskType) => {
                // const updateTaskHandler = (newTitle: string) => {
                //     updateTask(todoId, task.id, newTitle);
                // }
                const onClickRemoveTaskHandler = (): void => {
                    removeTask(task.id, todoId);
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
                    let currentChecked = e.currentTarget.checked;
                    changeTaskStatus(todoId, task.id, currentChecked);
                }
                const taskClass = task.isDone ? 'is-done' : '';
                return (
                    <li key={task.id} className={taskClass}>
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <EditableSpan oldTitle={task.title} callBack={(title)=>updateTaskHandler(task.id, title)}/>
                        <button onClick={onClickRemoveTaskHandler}>X</button>
                    </li>
                )
            })}
        </ul> :
        <span>Your list is empty!</span>

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} callBack={updateTodoHandler}/>
                <button onClick={onClickRemoveTodoListHandler}>X</button>
            </h3>

            <AddItems callBack={addTaskHandler}/>
            {tasksList}

            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onClickSetAllFilterHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onClickSetActiveFilterHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickSetCompletedFilterHandler}>Completed
                </button>
            </div>
        </div>
    );
};

