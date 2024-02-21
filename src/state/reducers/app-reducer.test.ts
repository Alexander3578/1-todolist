import { appActions, AppInitialState, appReducer } from "state/reducers/appSlice";

let startState: AppInitialState;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInizialised: false,
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(startState, appActions.setAppError({ error: "some error" }));
  expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
  const endState = appReducer(startState, appActions.setAppStatus({ status: "succeeded" }));
  expect(endState.status).toBe("succeeded");
});
