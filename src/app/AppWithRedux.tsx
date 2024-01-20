import React, {useCallback} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
    addTodoListAC,
} from '../state/reducers/todolists-reducer';
import {AddItems} from '../compomemts/addItems/AddItems';
import ButtonAppBar from '../compomemts/buttonAppBar/ButtonAppBar';
import {TaskType} from '../api/tasks-api/tasks-api';
import {useAppDispatch} from '../hooks/hooks';
import {v1} from 'uuid';
import {TodoListsList} from '../features/todolistsList/TodoListLists';

export type TaskStateType = {
    [key: string]: TaskType[]
}

export function AppWithRedux() {

    const dispatch = useAppDispatch();

    const addTodoList = useCallback((todoName: string) => {
        const action = addTodoListAC({id: v1(), title: todoName, filter: 'all', addedDate: '', order: 0});
        dispatch(action);
    }, [dispatch])

    return (
        <div>
            <ButtonAppBar/>
            <Grid container style={{padding: '20px'}}>
                <AddItems callBack={addTodoList}/>
            </Grid>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    );
}
