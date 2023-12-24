import React, {ChangeEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemsPropsType = {
    callBack: (newTask: string) => void
}

export const AddItems: React.FC<AddItemsPropsType> = memo((props:AddItemsPropsType) => {
        const {callBack} = props
    debugger;
        const [newItem, setNewItem] = useState<string>('');
        const [error, setError] = useState<string | null>(null);

        const onChangeNewItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if(error) setError(null);
            if (event.currentTarget.value.trim() || event.currentTarget.value === '') {
                setNewItem(event.currentTarget.value);
            } else setError('Title is required')
        }

        const onClickAddItemHandler = () => {
            if (newItem.trim()) {
                callBack(newItem);
                setNewItem('');
            } else setError('Title is required!')
        }

        const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if(error) setError(null);
            event.key === 'Enter' && !disabledCondition && onClickAddItemHandler();
        }

        const disabledCondition: boolean = !newItem.trim().length || newItem.length > 15;

        const buttonStyles = {
            maxWidth: '40px',
            maxHeight: '40px',
            minWidth: '40px',
            minHeight: '40px',
            backgroundColor: '#7e78d0',
            color: 'whitesmoke'
        }

        return (
            <div>
                <TextField id="outlined-basic"
                           label={error ? error : 'Type text here...'}
                           variant="outlined"
                           size="small"
                           onChange={onChangeNewItemHandler}
                           onKeyDown={onKeyDownHandler}
                           value={newItem}
                           error={!!error}/>
                <Button style={buttonStyles}
                        variant="contained"
                        disabled={disabledCondition}
                        onClick={onClickAddItemHandler}>
                    +
                </Button>
            </div>
        );
    }
);

