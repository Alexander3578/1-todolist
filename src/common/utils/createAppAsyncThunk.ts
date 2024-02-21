import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootStateType } from "state/store";
import { BaseResponseType } from "common/api/todolists-api/todolists-api";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatchType;
  rejectValue: null | BaseResponseType;
}>();
