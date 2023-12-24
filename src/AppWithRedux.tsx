import React, {useCallback} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodoListAC,
} from './state/reducers/todolists-reducer';
import {AddItems} from './compomemts/addItems/AddItems';
import ButtonAppBar from './compomemts/buttonAppBar/ButtonAppBar';
import {useDispatch, useSelector} from 'react-redux';
import {TodolistWithRedux} from './TodolistWithRedux';
import {todoListSelector} from './state/selectors';

export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export function AppWithRedux() {

    let todoLists = useSelector(todoListSelector);

    let dispatch = useDispatch();

    const addTodoList = useCallback((todoName: string) => {
        const action = addTodoListAC(todoName);
        dispatch(action);
    }, [dispatch])

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItems callBack={addTodoList}/>
                </Grid>
                <Grid container>
                    {
                        todoLists.map(todo => {
                            return <Paper elevation={3} style={{padding: '15px', margin: '15px'}}>
                                <TodolistWithRedux todoList={todo}/>
                            </Paper>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
