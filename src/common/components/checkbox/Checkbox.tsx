import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";
import Checkbox from "@mui/material/Checkbox";
import { TaskStatuses } from "features/todolistsList/api/tasks-api/tasksApi.types";

type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type Props = DefaultInputProps & {
  callback: (currentChecked: boolean) => void;
  status: TaskStatuses;
};

export const UniversalCheckbox: React.FC<Props> = ({ callback, status }) => {
  const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    callback(e.currentTarget.checked);
  };

  return <Checkbox checked={status === TaskStatuses.Completed} onChange={onChangeChecked} />;
};
