import { AxiosInstance } from "axios";
import { BaseResponseType } from "features/todolistsList/api/todolists-api/todolists-api";

//TYPES
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
export type LoginMeType = Omit<LoginParamsType, "captcha">;

export class AuthApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  logIn(loginData: LoginParamsType) {
    return this.instance.post<BaseResponseType<{ userId: number }>>("/auth/login", loginData).then((res) => res.data);
  }

  logOut() {
    return this.instance.delete<BaseResponseType>("/auth/login").then((res) => res.data);
  }

  me() {
    return this.instance.get<BaseResponseType<LoginMeType>>("/auth/me").then((res) => res.data);
  }
}
