import React from "react";
import { FilterButton } from "common/components/filterButton/FilterButton";
import { todolistActions } from "features/todolistsList/model/todolists/todolistsSlice";
import { useAppDispatch } from "common/hooks/hooks";
import { FilterValuesType, TodolistType } from "features/todolistsList/api/todolists-api/todolistsApi.types";

type Props = {
  todoList: TodolistType;
};

export const FilterTasksButtons = ({ todoList }: Props) => {
  const dispatch = useAppDispatch();

  const changeTaskFilterHandler = (filterValue: FilterValuesType) => {
    dispatch(todolistActions.changeTodoListFilter({ todoId: todoList.id, newFilterValue: filterValue }));
  };

  return (
    <div>
      <FilterButton
        color="primary"
        variant={todoList.filter === "all" ? "contained" : "outlined"}
        onClick={() => changeTaskFilterHandler("all")}
      >
        All
      </FilterButton>
      <FilterButton
        color="secondary"
        variant={todoList.filter === "active" ? "contained" : "outlined"}
        onClick={() => changeTaskFilterHandler("active")}
      >
        Active
      </FilterButton>
      <FilterButton
        color="error"
        variant={todoList.filter === "completed" ? "contained" : "outlined"}
        onClick={() => changeTaskFilterHandler("completed")}
      >
        Completed
      </FilterButton>
    </div>
  );
};
