import {TaskStateType} from '../../garbage/App';
import {addTodoListAC, todolistReducer} from './todolists-reducer';
import {taskReducer} from './tasks-reducer';
import {TodolistType} from '../../api/todolists-api/todolists-api';
import {v1} from 'uuid';

test('ids should be equals', () => {
    const startTasksState: TaskStateType ={};
    const startTodoState: TodolistType[] =[];

    const action = addTodoListAC({id: v1(), title: 'What to learn', filter: 'all', addedDate: '', order: 0});

    const endTaskState = taskReducer(startTasksState, action)
    const endTodoState = todolistReducer(startTodoState, action)

    const keys = Object.keys(endTaskState);
    const idFromTask = keys[0];
    const idFromTodo = endTodoState[0].id;

    expect(idFromTask).toBe(action.payload.todolist.id)
    expect(idFromTodo).toBe(action.payload.todolist.id)
    expect(idFromTask).toEqual(idFromTodo)
})