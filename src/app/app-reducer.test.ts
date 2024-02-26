import { appActions, AppInitialState, appReducer } from "app/appSlice";

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

test("toggleAppIsInizialised action should toggle the isInizialised flag", () => {
  const action = appActions.toggleAppIsInizialised({ isInizialised: true });
  const endState = appReducer(startState, action);
  expect(endState.isInizialised).toBe(true);
});

test("actions with isRejected matcher should set status to failed and set error message", () => {
  const rejectedAction = {
    type: "app/rejected",
    payload: { message: "Fetch error" },
  };
  const endState = appReducer(startState, rejectedAction);
  expect(endState.status).toBe("failed");
  expect(endState.error).toBe("Fetch error");
});
