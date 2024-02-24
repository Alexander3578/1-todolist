import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { todolistThunk } from "features/todolistsList/model/todolists/todolistsSlice";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksSlice";
import { authThunk } from "features/login/model/authSlice";

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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending,
        // (action: UnknownAction) => {
        //   return action.type.endsWith("/pending");
        // },
        (state, action) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        isFulfilled,
        // (action: UnknownAction) => {
        //   return action.type.endsWith("/fulfilled");
        // },
        (state, action) => {
          state.status = "succeeded";
        },
      )
      .addMatcher(
        isRejected,
        // (action: UnknownAction) => {
        //   return action.type.endsWith("/rejected");
        // },
        (state, action: any) => {
          state.status = "failed";

          if (action.payload) {
            if (
              action.type === todolistThunk.addTodoList.rejected.type ||
              action.type === tasksThunk.addTasks.rejected.type ||
              action.type === authThunk.authMe.rejected.type
            ) {
              return;
            }
            state.error = action.payload.messages[0];
          } else {
            state.error = action.error.message ? action.error.message : "Some error occurred";
          }
        },
      );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
