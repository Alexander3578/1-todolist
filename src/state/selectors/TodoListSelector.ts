import {AppRootStateType} from '../store';
import {TodolistType} from '../../api/todolists-api/todolists-api';

export const todoListSelector = (state: AppRootStateType):TodolistType[] => state.todoList


