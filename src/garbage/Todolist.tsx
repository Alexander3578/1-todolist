import React from 'react';
import {AddItems} from '../compomemts/addItems/AddItems';
import {EditableSpan} from '../compomemts/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {UniversalCheckbox} from '../compomemts/checkbox/Checkbox';
import {TaskStatuses, TaskType} from '../api/tasks-api/tasks-api';
import {FilterValuesType} from '../api/todolists-api/todolists-api';

type TodolistPropsType = {
    title: string,
    todoId: string
    tasks: Array<TaskType>
    removeTask: (todoId: string, id: string) => void
    changeFilter: (todoId: string, newFilterValue: FilterValuesType) => void
    addTask: (todoId: string, newTask: string) => void
    changeTaskStatus: (todoId: string, id: string, status: TaskStatuses) => void
    filter: FilterValuesType
    removeTodoList: (todoId: string) => void
    updateTask: (todoId: string, taskId: string, newTaskTitle: string) => void
    updateTodo: (todoId: string, newTodoTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    let {title, todoId, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, removeTodoList, updateTask, updateTodo} = props

    const filteredTasks: TaskType[] =
        (filter === 'active' ?
            tasks.filter((task: TaskType) => task.status === TaskStatuses.New) :
            filter === 'completed' ?
                tasks.filter((task: TaskType) => task.status === TaskStatuses.Completed) :
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

    const onChangeHandler = (taskId: string, currentChecked: boolean): void => {
        changeTaskStatus(todoId, taskId, currentChecked ? TaskStatuses.Completed : TaskStatuses.New);
    }

    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length ?
        <ul>
            {filteredTasks.map((task: TaskType) => {
                // const updateTaskHandler = (newTitle: string) => {
                //     updateTask(todoId, task.id, newTitle);
                // }
                const onClickRemoveTaskHandler = (): void => {
                    removeTask(todoId, task.id);
                }
                const taskClass = task.status === TaskStatuses.Completed ? 'is-done' : '';
                return (
                    <li key={task.id} className={taskClass}>
                        <UniversalCheckbox status={task.status} callback = {(currentChecked) => onChangeHandler(task.id, currentChecked)}/>
                        <EditableSpan oldTitle={task.title} callBack={(title)=>updateTaskHandler(task.id, title)}/>
                        <IconButton onClick={onClickRemoveTaskHandler}
                                    aria-label="delete"
                                    size="small">
                            <Delete fontSize="inherit" />
                        </IconButton>
                    </li>
                )
            })}
        </ul> :
        <span>Your list is empty!</span>

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} callBack={updateTodoHandler}/>
                <IconButton onClick={onClickRemoveTodoListHandler}
                            aria-label="delete"
                            size="medium">
                    <Delete fontSize="inherit" />
                </IconButton>
            </h3>

            <AddItems callBack={addTaskHandler}/>
            {tasksList}

            <div>
                <Button variant={ filter === 'all' ? "contained" : "outlined"}
                        color='primary'
                        onClick={onClickSetAllFilterHandler}>
                    All
                </Button>
                <Button variant={ filter === 'active' ? "contained" : "outlined"}
                        color='secondary'
                        onClick={onClickSetActiveFilterHandler}>
                    Active
                </Button>
                <Button variant={ filter === 'completed' ? "contained" : "outlined"}
                        color='error'
                        onClick={onClickSetCompletedFilterHandler}>
                    Completed
                </Button>
            </div>
        </div>
    );
};

