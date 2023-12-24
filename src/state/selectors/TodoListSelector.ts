import React from 'react';
import {AppRootStateType} from '../store';
import {TodoListType} from '../../AppWithRedux';

export const todoListSelector = (state: AppRootStateType):TodoListType[] => state.todoList


