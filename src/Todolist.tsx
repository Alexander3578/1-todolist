import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodolistPropsType = {
    title: string,
    todoId: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoId: string) => void
    addTask: (newTask: string, todoId: string) => void
    changeTaskStatus: (id: string, idDone: boolean, todoId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = ({
                                                          title,
                                                          todoId,
                                                          tasks,
                                                          removeTask,
                                                          changeFilter,
                                                          addTask,
                                                          changeTaskStatus,
                                                          filter,
                                                          removeTodoList
                                                      }) => {
    const [newTask, setNewTask] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const filteredTasks: TaskType[] =
        (filter === 'active' ?
            tasks.filter((task: TaskType) => !task.isDone) :
            filter === 'completed' ?
                tasks.filter((task: TaskType) => task.isDone) :
                tasks)

    const onChangeNewTaskHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        error && setError(false);
        if (event.currentTarget.value.trim() || event.currentTarget.value === '') {
            setNewTask(event.currentTarget.value);
        } else setError(true)
    }

    const onClickNewTaskHandler = () => {
        if (newTask.trim()) {
            addTask(newTask, todoId);
            setNewTask('');
        } else setError(true)
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) =>
        event.key === 'Enter' && !disabledCondition && onClickNewTaskHandler();

    const onClickSetAllFilterHandler = (): void => changeFilter('all', todoId);
    const onClickSetCompletedFilterHandler = (): void => changeFilter('completed', todoId);
    const onClickSetActiveFilterHandler = (): void => changeFilter('active', todoId);

    const onClickRemoveTodoListHandler = () => removeTodoList(todoId);
    // const noSymbolsHandler:boolean | JSX.Element =
    // !newTask.trim().length && <p style={{color: 'red'}}>You need to write something!</p>

    const tooMuchSymbolsHandler: boolean | JSX.Element =
        newTask.length > 15 && <p style={{color: 'red'}}>You've wrote too much symbols!</p>

    const disabledCondition: boolean = !newTask.trim().length || newTask.length > 15;

    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length ?
        <ul>
            {filteredTasks.map((task: TaskType) => {
                const onClickRemoveTaskHandler = (): void => {
                    removeTask(task.id, todoId);
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
                    let currentChecked = e.currentTarget.checked;
                    changeTaskStatus(task.id, currentChecked, todoId);
                }
                const taskClass = task.isDone ? 'is-done' : '';
                return (
                    <li key={task.id} className={taskClass}>
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <span>{task.title}</span>
                        <button onClick={onClickRemoveTaskHandler}>X</button>
                    </li>
                )
            })}
        </ul> :
        <span>Your list is empty!</span>

    return (
        <div>
            <h3>
                {title}
                <button onClick={onClickRemoveTodoListHandler}>X</button>
            </h3>
            <div>
                <input onChange={onChangeNewTaskHandler}
                       onKeyDown={onKeyDownHandler}
                       value={newTask}
                       className={error ? 'input-error' : ''}
                       placeholder={'Please, start typing...'}/>
                <button disabled={disabledCondition}
                        onClick={onClickNewTaskHandler}>
                    +
                </button>
                {error && <p className="error-message">You need to write something!</p>}
                {tooMuchSymbolsHandler}
            </div>
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

