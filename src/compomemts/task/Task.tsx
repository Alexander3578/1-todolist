import React, {useCallback} from 'react';
import {UniversalCheckbox} from '../checkbox/Checkbox';
import {EditableSpan} from '../editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {TaskType} from '../../AppWithRedux';

type TaskPropsType = {
    task: TaskType
    onChangeTaskStatusHandler: (taskId: string, checked: boolean) => void
    updateTaskHandler: (taskId: string, title: string) => void
    onClickRemoveTaskHandler: (taskId: string) => void
}

export const Task = React.memo(({
                                    task,
                                    updateTaskHandler,
                                    onClickRemoveTaskHandler,
                                    onChangeTaskStatusHandler
                                }: TaskPropsType) => {

        const onChangeTaskStatus = useCallback(
            (currentChecked: boolean) => {
                onChangeTaskStatusHandler(task.id, currentChecked)
            }, [onChangeTaskStatusHandler])

        const updateTaskTitle = useCallback((title: string) => {
            updateTaskHandler(task.id, title)
        }, [updateTaskHandler])

        const onClickRemoveTask = useCallback(() => {
            onClickRemoveTaskHandler(task.id)
        }, [onClickRemoveTaskHandler])

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <UniversalCheckbox isDone={task.isDone}
                                   callback={onChangeTaskStatus}/>
                <EditableSpan oldTitle={task.title} callBack={updateTaskTitle}/>
                <IconButton onClick={onClickRemoveTask}
                            aria-label="delete"
                            size="small">
                    <Delete fontSize="inherit"/>
                </IconButton>
            </li>
        )
    }
)

