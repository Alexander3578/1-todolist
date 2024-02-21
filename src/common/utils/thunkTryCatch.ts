import { appActions } from "state/reducers/appSlice";
import { handleServerNetworkError } from "common/utils/errorUtils/handleServerNetworkError";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatchType, AppRootStateType } from "state/store";
import { BaseResponseType } from "common/api/todolists-api/todolists-api";
import { todolistActions } from "state/reducers/todolistsSlice";

/**
 * Обертка для выполнения асинхронных операций с блоком try-catch.
 * @template T - тип возвращаемого значения асинхронной операции.
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatchType, null | BaseResponseType>} thunkAPI - объект API для асинхронного thunk.
 * @param {() => Promise<T>} logic - функция, представляющая асинхронную операцию.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} - обещание, содержащее возвращаемое значение асинхронной операции или отклоненное значение.
 */
export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatchType, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;

  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return await logic();
  } catch (err) {
    handleServerNetworkError(dispatch, err);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
