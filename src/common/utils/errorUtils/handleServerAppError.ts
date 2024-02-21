import { AppDispatchType } from "state/store";
import { appActions } from "state/reducers/appSlice";
import { BaseResponseType } from "common/api/todolists-api/todolists-api";

/**
 * Обработчик ошибок с сервера приложения.
 * @template T - тип данных, содержащихся в ответе от сервера.
 * @param {AppDispatchType} dispatch - функция диспетчера Redux, используемая для отправки действий к хранилищу.
 * @param {BaseResponseType<T>} data - ответ от сервера, содержащий информацию об ошибке и/или данных.
 * @param {boolean} [isShowGlobalError=true] - флаг, указывающий, следует ли показывать глобальную ошибку пользователю.
 * @return {void} - функция ничего не возвращает
 */
export const handleServerAppError = <T>(
  dispatch: AppDispatchType,
  data: BaseResponseType<T>,
  isShowGlobalError: boolean = true,
) => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred!" }));
    }
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
