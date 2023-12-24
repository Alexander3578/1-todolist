import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    callBack: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

        const {oldTitle, callBack} = props;

        const [edit, setEdit] = useState(false);
        const [changeTitle, setChangeTitle] = useState<string>(oldTitle);


        const onDoubleClickEditHandler = () => setEdit(true)
        const onBlurEditHandler = () => {
            setEdit(false)
            callBack(changeTitle)
        }
        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setChangeTitle(e.currentTarget.value)
        }

        return (
            edit
                ?
                <input value={changeTitle}
                       onBlur={onBlurEditHandler}
                       onChange={onChangeTitleHandler}
                       autoFocus>
                </input>
                :
                <span onDoubleClick={onDoubleClickEditHandler}>{oldTitle}</span>
        );
    }
)

