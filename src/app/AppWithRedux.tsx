import React, { useEffect } from "react";
import ButtonAppBar from "../common/components/buttonAppBar/ButtonAppBar";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import CustomizedSnackbars from "../common/components/errorSnackbar/ErrorSanckbar";
import { authThunk } from "features/login/model/authSlice";
import { CircularProgress } from "@mui/material";
import { isInizialisedSelector } from "app/AppSelectors";
import { AppRouteContainer } from "app/AppRouteContainer";
import { hot } from "react-hot-loader";

function AppWithRedux() {
  const dispatch = useAppDispatch();
  const isInizialised = useAppSelector(isInizialisedSelector);

  useEffect(() => {
    if (!isInizialised) dispatch(authThunk.authMe());
  }, []);

  return isInizialised ? (
    <div>
      <CustomizedSnackbars />
      <ButtonAppBar />
      <AppRouteContainer />
    </div>
  ) : (
    <div
      style={{
        position: "fixed",
        textAlign: "center",
        width: "100%",
        top: "30%",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default hot(module)(AppWithRedux);
