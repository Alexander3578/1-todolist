import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootStateType } from "app/store";
import { BaseResponseType } from "features/todolistsList/api/todolists-api/todolists-api";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatchType;
  rejectValue: null | BaseResponseType;
}>();
