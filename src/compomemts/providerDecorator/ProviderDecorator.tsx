import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {combineReducers, legacy_createStore} from 'redux';
import {taskReducer} from '../../state/reducers/tasks-reducer';
import {todolistReducer} from '../../state/reducers/todolists-reducer';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    todoList: todolistReducer,
    tasks: taskReducer
})

const initialGlobalState: AppRootStateType = {
    todoList: [
        {id: 'todoIdOne', title: 'What to learn', filter: 'all'},
        {id: 'todoIdTwo', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todoIdOne']: [
            {title: 'CSS', id: v1(), isDone: true},
            {title: 'JS', id: v1(), isDone: false},
            {title: 'React', id: v1(), isDone: true},
            {title: 'Rest API', id: v1(), isDone: false},
            {title: 'SQL', id: v1(), isDone: false},
        ],
        ['todoIdTwo']: [
            {title: 'Milk', id: v1(), isDone: false},
            {title: 'Cheese', id: v1(), isDone: false},
            {title: 'Porridge', id: v1(), isDone: true},
            {title: 'Eggs', id: v1(), isDone: true},
            {title: 'Protein', id: v1(), isDone: true},
        ]
    }
}

export const storyBookStore = legacy_createStore
(rootReducer, initialGlobalState as AppRootStateType)

export  const ProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

