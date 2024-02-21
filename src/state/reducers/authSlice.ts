import { LoginParamsType } from "common/api/auth-api/auth-api";
import { appActions } from "state/reducers/appSlice";
import { api } from "common/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { clearTodoAndTasks } from "common/common.actions";
import { handleServerAppError } from "common/utils/errorUtils/handleServerAppError";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunkTryCatch";
import { ResultCode } from "state/reducers/tasksSlice";

//REDUCER
export const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLogged;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLogged;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLogged;
      });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

//THUNKS

export const login = createAppAsyncThunk<{ isLogged: boolean }, { loginData: LoginParamsType }>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    return thunkTryCatch(thunkAPI, async () => {
      const res = await api.authApi.logIn(arg.loginData);
      if (res.resultCode === ResultCode.SUCCEEDED) {
        return { isLogged: true };
      } else {
        const isShowAppError = !res.fieldsErrors.length;

        handleServerAppError(dispatch, res, isShowAppError);
        return rejectWithValue(res);
      }
    });
  },
);

export const logout = createAppAsyncThunk<
  {
    isLogged: boolean;
  },
  undefined
>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  return thunkTryCatch(thunkAPI, async () => {
    const res = await api.authApi.logOut();
    if (res.resultCode === ResultCode.SUCCEEDED) {
      dispatch(clearTodoAndTasks({ tasks: {}, todolists: [] }));
      return { isLogged: false };
    } else {
      handleServerAppError(dispatch, res);
      return rejectWithValue(null);
    }
  });
});

const authMe = createAppAsyncThunk<{ isLogged: boolean }, undefined>(`${slice.name}/authMe`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  return thunkTryCatch(thunkAPI, async () => {
    const res = await api.authApi.me();
    if (res.resultCode === 0) {
      return { isLogged: true };
    } else {
      handleServerAppError(dispatch, res, false);
      return rejectWithValue(null);
    }
  }).finally(() => {
    dispatch(appActions.toggleAppIsInizialised({ isInizialised: true }));
  });
});
export const authThunk = { login, logout, authMe };
