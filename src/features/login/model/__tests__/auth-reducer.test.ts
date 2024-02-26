import { authReducer, authThunk } from "features/login/model/authSlice";

test("isLogged should be true after login", () => {
  const startState = {
    isLoggedIn: false,
  };

  const action = authThunk.login.fulfilled({ isLogged: true }, "requestId", {
    loginData: {
      email: "predator12007@mail.ru",
      password: "Diego",
      rememberMe: false,
    },
  });

  const endState = authReducer(startState, action);

  expect(endState.isLoggedIn).toBe(true);
});

test("isLoggedIn should remain false if login action is rejected", () => {
  const startState = {
    isLoggedIn: false,
  };

  const action = authThunk.login.rejected(new Error("Login failed"), "requestId", {
    loginData: {
      email: "wrong@mail.ru",
      password: "wrong",
      rememberMe: false,
    },
  });

  const endState = authReducer(startState, action);

  expect(endState.isLoggedIn).toBe(false);
});

test("isLoggedIn should be false after logout", () => {
  const startState = {
    isLoggedIn: true,
  };

  const action = authThunk.logout.fulfilled({ isLogged: false }, "requestId", undefined);

  const endState = authReducer(startState, action);

  expect(endState.isLoggedIn).toBe(false);
});

test("isLoggedIn should be true after authMe", () => {
  const startState = {
    isLoggedIn: false,
  };

  const action = authThunk.authMe.fulfilled({ isLogged: true }, "requestId", undefined);

  const endState = authReducer(startState, action);

  expect(endState.isLoggedIn).toBe(true);
});
