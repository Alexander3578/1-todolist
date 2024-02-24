//TYPES
import { RequestStatus } from "app/appSlice";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistResponseType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TodolistType = TodolistResponseType & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

export type FieldsErrorType = {
  error: string;
  field: string;
};
