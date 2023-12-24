import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import Checkbox from '@mui/material/Checkbox';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type CheckboxInputPropsType = DefaultInputPropsType & {
    callback: (currentChecked: boolean) => void
    isDone: boolean
}

export const UniversalCheckbox:React.FC<CheckboxInputPropsType> = ({callback, isDone}) => {

    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }

    return <Checkbox checked={isDone} onChange={onChangeChecked}/>

};

