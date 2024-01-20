import React, {memo, useCallback, useEffect} from 'react';
import {AddItems} from '../../../compomemts/addItems/AddItems';
import {EditableSpan} from '../../../compomemts/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {
    addTasksTC,
    deleteTasksTC,
    getTasksTC, updateTaskTC
} from '../../../state/reducers/tasks-reducer';
import {changeTodoListFilterAC, removeTodoListAC, updateTodoListAC} from '../../../state/reducers/todolists-reducer';
import {tasksSelector} from '../../../state/selectors';
import {FilterButton} from '../../../compomemts/filterButton/FilterButton';
import {Task} from './task/Task';
import {TaskStatuses, TaskType} from '../../../api/tasks-api/tasks-api';
import {TodolistType} from '../../../api/todolists-api/todolists-api';
import {TaskStateType} from '../../../app/AppWithRedux';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';

type TodolistPropsType = {
    todoList: TodolistType
}

export const TodolistWithRedux: React.FC<TodolistPropsType> = memo(({todoList}: TodolistPropsType) => {

        const tasks = useAppSelector<TaskStateType>(tasksSelector);
        const dispatch = useAppDispatch();
        useEffect(() => {
            dispatch(getTasksTC(todoList.id))
        }, [])

        const filteredTasks: TaskType[] = (todoList.filter === 'active' ?
            tasks[todoList.id].filter((task: TaskType) => task.status === TaskStatuses.New) :
            todoList.filter === 'completed' ?
                tasks[todoList.id].filter((task: TaskType) => task.status === TaskStatuses.Completed) :
                tasks[todoList.id])


        const onClickSetAllFilterHandler = useCallback(
            () => dispatch(changeTodoListFilterAC(todoList.id, 'all')),
            [todoList.id, dispatch]);

        const onClickSetCompletedFilterHandler = useCallback(
            () => dispatch(changeTodoListFilterAC(todoList.id, 'completed')),
            [dispatch, todoList.id]);

        const onClickSetActiveFilterHandler = useCallback(
            () => dispatch(changeTodoListFilterAC(todoList.id, 'active')),
            [dispatch, todoList.id]);

        const onClickRemoveTodoListHandler = useCallback(
            () => dispatch(removeTodoListAC(todoList.id)),
            [dispatch, todoList.id]);

        const addTaskHandler = useCallback(
            (newTask: string) => dispatch(addTasksTC(newTask, todoList.id)),
            [todoList.id, dispatch]);

        const updateTodoHandler = useCallback(
            (newTitle: string) => dispatch(updateTodoListAC(todoList.id, newTitle)),
            [dispatch, todoList.id]);

        const updateTaskTitleHandler = useCallback(
            (taskId: string, newTitle: string) => dispatch(updateTaskTC(taskId, {title: newTitle}, todoList.id)),
            [dispatch, todoList.id])

        const onChangeTaskStatusHandler = useCallback(
            (taskId: string, currentChecked: boolean) =>
                dispatch(updateTaskTC(taskId, {status: currentChecked ? 2 : 1}, todoList.id)),
            [dispatch, todoList.id])

        const onClickRemoveTaskHandler = useCallback(
            (taskId: string) =>
                dispatch(deleteTasksTC(taskId, todoList.id)),
            [dispatch, todoList.id]
        )

        const tasksList: Array<JSX.Element> | JSX.Element = tasks[todoList.id].length ?
            <ul>
                {filteredTasks.map((task: TaskType) => {

                    return (
                        <Task key={task.id}
                              task={task}
                              onChangeTaskStatusHandler={onChangeTaskStatusHandler}
                              updateTaskTitleHandler={updateTaskTitleHandler}
                              onClickRemoveTaskHandler={onClickRemoveTaskHandler}
                        />
                    )
                })}
            </ul> :
            <span>Your list is empty!</span>

        return (
            <div>
                <h3>
                    <EditableSpan oldTitle={todoList.title} callBack={updateTodoHandler}/>
                    <IconButton onClick={onClickRemoveTodoListHandler}
                                aria-label="delete"
                                size="medium">
                        <Delete fontSize="inherit"/>
                    </IconButton>
                </h3>

                <AddItems callBack={addTaskHandler}/>
                {tasksList}

                <div>
                    <FilterButton color="primary"
                                  variant={todoList.filter === 'all' ? 'contained' : 'outlined'}
                                  onClick={onClickSetAllFilterHandler}>
                        All
                    </FilterButton>
                    <FilterButton color="secondary"
                                  variant={todoList.filter === 'active' ? 'contained' : 'outlined'}
                                  onClick={onClickSetActiveFilterHandler}>
                        Active
                    </FilterButton>
                    <FilterButton color="error"
                                  variant={todoList.filter === 'completed' ? 'contained' : 'outlined'}
                                  onClick={onClickSetCompletedFilterHandler}>
                        Completed
                    </FilterButton>
                </div>
            </div>
        );
    }
)

