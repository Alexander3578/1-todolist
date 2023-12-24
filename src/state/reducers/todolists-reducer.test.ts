import {v1} from 'uuid';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    todolistReducer,
    updateTodoListAC
} from './todolists-reducer';
import {TodoListType} from '../../App';

let todoListId1 = v1();
let todoListId2 = v1();

let startState:TodoListType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
]

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

})

test('correct todoList should be removed', () => {

    const endState = todolistReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test('todoList should be add', () => {

    const endState = todolistReducer(startState, addTodoListAC('What to sale'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('What to sale');
})

test('correct todoList should be updated', () => {

    const endState = todolistReducer(startState, updateTodoListAC(todoListId1, 'Updated'))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('Updated');
})

test('change todoList filter', () => {

    const endState = todolistReducer(startState, changeTodoListFilterAC(todoListId2, 'active'))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('active');
})