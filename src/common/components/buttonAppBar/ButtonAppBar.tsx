import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { isLoggedSelector } from "features/login/model/AuthSelectors";
import { authThunk } from "features/login/model/authSlice";
import { statusSelector } from "app/AppSelectors";
import LinearProgress from "@mui/material/LinearProgress";

export default function ButtonAppBar() {
  const isLogged = useAppSelector<boolean>(isLoggedSelector);
  const dispatch = useAppDispatch();
  const status = useAppSelector(statusSelector);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLogged && (
            <Button color="inherit" onClick={() => dispatch(authThunk.logout())}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === "loading" && <LinearProgress />}
    </Box>
  );
}
