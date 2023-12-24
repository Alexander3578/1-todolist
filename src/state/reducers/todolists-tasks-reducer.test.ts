import {TaskStateType, TodoListType} from '../../App';
import {addTodoListAC, todolistReducer} from './todolists-reducer';
import {taskReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TaskStateType ={};
    const startTodoState: TodoListType[] =[];

    const action = addTodoListAC('newTodo');

    const endTaskState = taskReducer(startTasksState, action)
    const endTodoState = todolistReducer(startTodoState, action)

    const keys = Object.keys(endTaskState);
    const idFromTask = keys[0];
    const idFromTodo = endTodoState[0].id;

    expect(idFromTask).toBe(action.payload.todolistId)
    expect(idFromTodo).toBe(action.payload.todolistId)
    expect(idFromTask).toEqual(idFromTodo)
})