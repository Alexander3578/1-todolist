import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  oldTitle: string;
  callBack: (title: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {
  const { oldTitle, callBack } = props;

  const [edit, setEdit] = useState(false);
  const [changeTitle, setChangeTitle] = useState<string>(oldTitle);

  const onDoubleClickEditHandler = () => setEdit(true);

  const onActiveEditHandler = () => {
    setEdit(false);
    callBack(changeTitle);
  };

  const onBlurEditHandler = () => {
    onActiveEditHandler();
  };

  const onKeyPressEditHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    debugger;
    if (event.code === "Enter") {
      onActiveEditHandler();
    }
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChangeTitle(e.currentTarget.value);
  };

  return edit ? (
    <input
      value={changeTitle}
      onBlur={onBlurEditHandler}
      onKeyDown={onKeyPressEditHandler}
      onChange={onChangeTitleHandler}
      autoFocus
    ></input>
  ) : (
    <span onDoubleClick={onDoubleClickEditHandler}>{oldTitle}</span>
  );
});
