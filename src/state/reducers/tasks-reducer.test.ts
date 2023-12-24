import {v1} from 'uuid';
import {TaskStateType, TodoListType} from '../../App';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    todolistReducer,
    updateTodoListAC
} from './todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './tasks-reducer';

let startState: TaskStateType = {
    'todoIdOne': [
        {title: 'CSS', id: '1', isDone: true},
        {title: 'JS', id: '2', isDone: false},
        {title: 'React', id: '3', isDone: true},
        {title: 'Rest API', id: '4', isDone: false},
        {title: 'SQL', id: '5', isDone: false},
    ],
    'todoIdTwo': [
        {title: 'Milk', id: '1', isDone: false},
        {title: 'Cheese', id: '2', isDone: false},
        {title: 'Porridge', id: '3', isDone: true},
        {title: 'Eggs', id: '4', isDone: true},
        {title: 'Protein', id: '5', isDone: true},
    ]
}

beforeEach(()=>{
    startState = {
        'todoIdOne': [
            {title: 'CSS', id: '1', isDone: true},
            {title: 'JS', id: '2', isDone: false},
            {title: 'React', id: '3', isDone: true},
            {title: 'Rest API', id: '4', isDone: false},
            {title: 'SQL', id: '5', isDone: false},
        ],
        'todoIdTwo': [
            {title: 'Milk', id: '1', isDone: false},
            {title: 'Cheese', id: '2', isDone: false},
            {title: 'Porridge', id: '3', isDone: true},
            {title: 'Eggs', id: '4', isDone: true},
            {title: 'Protein', id: '5', isDone: true},
        ]
    }
})

test('correct task should be deleted', () => {

    const action = removeTaskAC('3', 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'Milk', id: '1', isDone: false},
        {title: 'Cheese', id: '2', isDone: false},
        {title: 'Eggs', id: '4', isDone: true},
        {title: 'Protein', id: '5', isDone: true},
    ])
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juice', 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'juice', id: '6', isDone: false},
        {title: 'Milk', id: '1', isDone: false},
        {title: 'Cheese', id: '2', isDone: false},
        {title: 'Porridge', id: '3', isDone: true},
        {title: 'Eggs', id: '4', isDone: true},
        {title: 'Protein', id: '5', isDone: true}
    ])
    expect(endState['todoIdTwo'].length).toBe(6)
    expect(endState['todoIdTwo'][0].id).toBeDefined();
    expect(endState['todoIdTwo'][0].title).toBe('juice');
    expect(endState['todoIdTwo'][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', true, 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'Milk', id: '1', isDone: false},
        {title: 'Cheese', id: '2', isDone: true},
        {title: 'Porridge', id: '3', isDone: true},
        {title: 'Eggs', id: '4', isDone: true},
        {title: 'Protein', id: '5', isDone: true}
    ])
    expect(endState['todoIdTwo'][1].isDone).toBe(true);
})

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('2', 'GRAPES', 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'Milk', id: '1', isDone: false},
        {title: 'GRAPES', id: '2', isDone: false},
        {title: 'Porridge', id: '3', isDone: true},
        {title: 'Eggs', id: '4', isDone: true},
        {title: 'Protein', id: '5', isDone: true}
    ])
    expect(endState['todoIdTwo'][1].title).toBe('GRAPES');
})

test('new array should be added when new todoList is added', () => {

    const endState = taskReducer(startState, addTodoListAC('What to sale'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todoIdOne' && k != 'todoIdTwo')

    if(!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolist should be deleted', () => {

    const endState = taskReducer(startState, removeTodoListAC('todoIdTwo'))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(keys[0]).toBe('todoIdOne');
    expect(endState['todoIdTwo']).not.toBeDefined();
})

