import React, {ChangeEvent, useState} from 'react';

type AddItemsPropsType = {
    callBack: (newTask: string) => void
}

export const AddItems:React.FC<AddItemsPropsType> = (props) => {

    const {callBack} = props

    const [newItem, setNewItem] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onChangeNewTaskHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        error && setError(false);
        if (event.currentTarget.value.trim() || event.currentTarget.value === '') {
            setNewItem(event.currentTarget.value);
        } else setError(true)
    }

    const onClickAddTaskHandler = () => {
        if (newItem.trim()) {
            callBack(newItem);
            setNewItem('');
        } else setError(true)
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) =>
        event.key === 'Enter' && !disabledCondition && onClickAddTaskHandler();

    const tooMuchSymbolsHandler: boolean | JSX.Element =
        newItem.length > 15 && <p style={{color: 'red'}}>You've wrote too much symbols!</p>

    const disabledCondition: boolean = !newItem.trim().length || newItem.length > 15;

    return (
        <div>
            <input onChange={onChangeNewTaskHandler}
                   onKeyDown={onKeyDownHandler}
                   value={newItem}
                   className={error ? 'input-error' : ''}
                   placeholder={'Please, start typing...'}/>
            <button disabled={disabledCondition}
                    onClick={onClickAddTaskHandler}>
                +
            </button>
            {error && <p className="error-message">You need to write something!</p>}
            {tooMuchSymbolsHandler}
        </div>
    );
};

