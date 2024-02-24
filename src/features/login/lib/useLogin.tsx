import React from "react";
import { useFormik } from "formik";
import { authThunk } from "features/login/model/authSlice";
import { BaseResponseType } from "features/todolistsList/api/todolists-api/todolists-api";
import { LoginMeType } from "features/login/api/auth-api/auth-api";
import { useAppDispatch } from "common/hooks/hooks";

type FormikErrorType = Partial<LoginMeType>;

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && values.email.length !== 0) {
        errors.email = "Invalid email address";
      }

      if (values.password.length <= 3 && values.password.length !== 0) {
        errors.password = "Password must have 3 more";
      }
      return errors;
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(authThunk.login({ loginData: values }))
        .unwrap()
        .then((res) => {
          formik.resetForm({
            values: {
              email: "",
              password: "",
              rememberMe: true,
            },
          });
        })
        .catch((err: BaseResponseType) => {
          if (err.fieldsErrors) {
            err.fieldsErrors.forEach((fieldError) => {
              formikHelpers.setFieldError(fieldError.field, fieldError.error);
            });
          }
        });
    },
  });

  return { formik };
};
