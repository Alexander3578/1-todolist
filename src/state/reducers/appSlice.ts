import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//TYPES
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialState = ReturnType<typeof slice.getInitialState>;

//REDUCER
const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
    error: null as null | string,
    isInizialised: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    toggleAppIsInizialised: (state, action: PayloadAction<{ isInizialised: boolean }>) => {
      state.isInizialised = action.payload.isInizialised;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
