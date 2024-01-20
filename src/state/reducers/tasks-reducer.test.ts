import {TaskStateType} from '../../garbage/App';
import {addTodoListAC, removeTodoListAC} from './todolists-reducer';
import {addTaskAC, removeTaskAC, taskReducer, updateTaskAC} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/tasks-api/tasks-api';

let startState: TaskStateType = {
    'todoIdOne': [
        {title: 'CSS', id: '1', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'JS', id: '2', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'React', id: '3', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Rest API', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'SQL', id: '5', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
    ],
    'todoIdTwo': [
        {title: 'Milk', id: '1', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Cheese', id: '2', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Porridge', id: '3', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Eggs', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Protein', id: '5', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
    ]
}

beforeEach(()=>{
    startState = {
        'todoIdOne': [
            {title: 'CSS', id: '1', status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'JS', id: '2', status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'React', id: '3', status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Rest API', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'SQL', id: '5', status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: 'todoIdOne', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        ],
        'todoIdTwo': [
            {title: 'Milk', id: '1', status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Cheese', id: '2', status: TaskStatuses.New, order: 0, addedDate: '',
                todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Porridge', id: '3', status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Eggs', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
            {title: 'Protein', id: '5', status: TaskStatuses.Completed, order: 0, addedDate: '',
                todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        ]
    }
})

test('correct task should be deleted', () => {

    const action = removeTaskAC('3', 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'Milk', id: '1', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Cheese', id: '2', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Eggs', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Protein', id: '5', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
    ])
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juice', 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'juice', id: '6', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Milk', id: '1', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Cheese', id: '2', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Porridge', id: '3', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Eggs', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Protein', id: '5', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
    ])
    expect(endState['todoIdTwo'].length).toBe(6)
    expect(endState['todoIdTwo'][0].id).toBeDefined();
    expect(endState['todoIdTwo'][0].title).toBe('juice');
    expect(endState['todoIdTwo'][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {status: TaskStatuses.Completed}, 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'Milk', id: '1', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Cheese', id: '2', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Porridge', id: '3', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Eggs', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Protein', id: '5', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
    ])
    expect(endState['todoIdTwo'][1].status).toBe(TaskStatuses.Completed);
})

test('title of specified task should be changed', () => {

    const action = updateTaskAC('2', {title: 'GRAPES'}, 'todoIdTwo')

    const endState = taskReducer(startState, action)

    expect(endState['todoIdTwo']).toEqual([
        {title: 'Milk', id: '1', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'GRAPES', id: '2', status: TaskStatuses.New, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Porridge', id: '3', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Eggs', id: '4', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
        {title: 'Protein', id: '5', status: TaskStatuses.Completed, order: 0, addedDate: '',
            todoListId: 'todoIdTwo', description: '', deadline: '', startDate: '', priority: TaskPriorities.Low},
    ])
    expect(endState['todoIdTwo'][1].title).toBe('GRAPES');
})

test('new array should be added when new todoList is added', () => {


    const endState = taskReducer(startState, addTodoListAC({id: 'todoIdThree', title: 'What to learn', filter: 'all', addedDate: '', order: 0}))

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

