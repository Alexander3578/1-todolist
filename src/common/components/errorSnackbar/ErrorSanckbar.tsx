import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { appActions } from "app/appSlice";

export default function CustomizedSnackbars() {
  const error = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppError({ error: null }));
  };

  return (
    <div>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
