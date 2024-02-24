import { appActions } from "app/appSlice";
import { AppDispatchType } from "app/store";
import axios from "axios";

/**
 * Обработчик сетевых ошибок сервера.
 * @param {AppDispatchType} dispatch - функция диспетчера Redux, используемая для отправки действий к хранилищу.
 * @param {unknown} err - ошибка, возникшая при взаимодействии с сервером.
 * @return {void} - функция ничего не возвращает
 */
export const handleServerNetworkError = (dispatch: AppDispatchType, err: unknown) => {
  let errorMessage = "Some error occurred!";
  if (axios.isAxiosError(err)) {
    //Проврка axios ошибки
    //err.response?.data.message - ошибка с запросом на сервер и т.д.
    //err.message - offline
    errorMessage = err.response?.data.message || err.message || errorMessage; //зависит от бэкенда
  } else if (err instanceof Error) {
    //Проверка нативной ошибки
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
  dispatch(appActions.setAppError({ error: errorMessage }));
};
