import React, {memo, useCallback, useMemo} from 'react';
import {TaskType} from './App';
import {AddItems} from './compomemts/addItems/AddItems';
import {EditableSpan} from './compomemts/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {TodoListType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/reducers/tasks-reducer';
import {changeTodoListFilterAC, removeTodoListAC, updateTodoListAC} from './state/reducers/todolists-reducer';
import {tasksSelector} from './state/selectors';
import {FilterButton} from './compomemts/filterButton/FilterButton';
import {Task} from './compomemts/task/Task';

type TodolistPropsType = {
    todoList: TodoListType
}

export const TodolistWithRedux: React.FC<TodolistPropsType> = memo(({todoList}: TodolistPropsType) => {

        console.log('sTODO');
        const tasks = useSelector(tasksSelector);
        const dispatch = useDispatch();

        const filteredTasks: TaskType[] = useMemo(
            () => {
                return (todoList.filter === 'active' ?
                        tasks[todoList.id].filter((task: TaskType) => !task.isDone) :
                        todoList.filter === 'completed' ?
                        tasks[todoList.id].filter((task: TaskType) => task.isDone) :
                        tasks[todoList.id])
            },
            [todoList.filter]
        )

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
            (newTask: string) => dispatch(addTaskAC(newTask, todoList.id)),
            [todoList.id, dispatch]);

        const updateTodoHandler = useCallback(
            (newTitle: string) => dispatch(updateTodoListAC(todoList.id, newTitle)),
            [dispatch, todoList.id]);

        const updateTaskHandler = useCallback(
            (taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(taskId, newTitle, todoList.id)),
            [dispatch, todoList.id])

        const onChangeTaskStatusHandler = useCallback(
            (taskId: string, currentChecked: boolean) =>
                dispatch(changeTaskStatusAC(taskId, currentChecked, todoList.id)),
            [dispatch, todoList.id])

        const onClickRemoveTaskHandler = useCallback(
            (taskId: string) =>
                dispatch(removeTaskAC(taskId, todoList.id)),
            [dispatch, todoList.id]
        )

        const tasksList: Array<JSX.Element> | JSX.Element = tasks[todoList.id].length ?
            <ul>
                {filteredTasks.map((task: TaskType) => {

                    return (
                        <Task key={task.id}
                              task={task}
                              onChangeTaskStatusHandler={onChangeTaskStatusHandler}
                              updateTaskHandler={updateTaskHandler}
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

