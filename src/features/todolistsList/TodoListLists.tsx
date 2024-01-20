import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {TodolistType} from '../../api/todolists-api/todolists-api';
import {todoListSelector} from '../../state/selectors';
import {getTodoListsTC} from '../../state/reducers/todolists-reducer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodolistWithRedux} from './todolist/TodolistWithRedux';

type TodoListsListPropsType = {}

export const TodoListsList: React.FC<TodoListsListPropsType> = (props) => {

    const todoLists = useAppSelector<TodolistType[]>(todoListSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [])

    return <Grid container>
        {
            todoLists.map(todo => (
                        <Paper elevation={3} style={{padding: '15px', margin: '15px'}}>
                            <TodolistWithRedux todoList={todo}/>
                        </Paper>
                    )
            )
        }
    </Grid>
}