import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppSelector } from "common/hooks/hooks";
import { Navigate } from "react-router-dom";
import { isLoggedSelector } from "features/login/model/AuthSelectors";
import { useLogin } from "features/login/lib/useLogin";

export const Login = () => {
  const isLogged = useAppSelector<boolean>(isLoggedSelector);

  const { formik } = useLogin();

  if (isLogged) return <Navigate to={"/"} />;

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}

              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}

              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
