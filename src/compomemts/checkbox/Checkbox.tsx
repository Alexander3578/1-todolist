import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from '../../api/tasks-api/tasks-api';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type CheckboxInputPropsType = DefaultInputPropsType & {
    callback: (currentChecked: boolean) => void
    status: TaskStatuses
}

export const UniversalCheckbox:React.FC<CheckboxInputPropsType> = ({callback, status}) => {

    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }

    return <Checkbox checked={status === TaskStatuses.Completed} onChange={onChangeChecked}/>

};

