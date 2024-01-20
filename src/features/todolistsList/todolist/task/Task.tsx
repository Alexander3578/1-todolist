import React, {useCallback} from 'react';
import {UniversalCheckbox} from '../../../../compomemts/checkbox/Checkbox';
import {EditableSpan} from '../../../../compomemts/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import {TaskStatuses, TaskType} from '../../../../api/tasks-api/tasks-api';

type TaskPropsType = {
    task: TaskType
    onChangeTaskStatusHandler: (taskId: string, checked: boolean) => void
    updateTaskTitleHandler: (taskId: string, title: string) => void
    onClickRemoveTaskHandler: (taskId: string) => void
}

export const Task = React.memo(({
                                    task,
                                    updateTaskTitleHandler,
                                    onClickRemoveTaskHandler,
                                    onChangeTaskStatusHandler
                                }: TaskPropsType) => {

        const onChangeTaskStatus = useCallback(
            (currentChecked: boolean) => {
                onChangeTaskStatusHandler(task.id, currentChecked)
            }, [onChangeTaskStatusHandler])

        const updateTaskTitle = useCallback((title: string) => {
            updateTaskTitleHandler(task.id, title)
        }, [updateTaskTitleHandler])

        const onClickRemoveTask = useCallback(() => {
            onClickRemoveTaskHandler(task.id)
        }, [onClickRemoveTaskHandler])

        return (
            <li key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <UniversalCheckbox status={task.status}
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

