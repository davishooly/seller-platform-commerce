
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux";
import {
  RequestAsyncAction,
  MutateAsyncAction
} from "redux-query";
// import { State } from "@types";

export const authHeader: Middleware = (
  api: MiddlewareAPI<Dispatch<AnyAction>>
) => (next: Dispatch) => (
  action: AnyAction | RequestAsyncAction | MutateAsyncAction
) => {
  if (
    action.type === "@@query/REQUEST_ASYNC" ||
    action.type === "@@query/MUTATE_ASYNC"
  ) {
    const queryAction = action;
    if (
      queryAction.meta &&
      queryAction.meta.authType &&
      queryAction.meta.authType[0] === "oauth"
    ) {
      const token = api.getState().auth.accessToken;
      if (token) {
        queryAction.options.headers.authorization = `Bearer ${token}`;
      } else {
        // throw new Error("Missing accessToken scenario is not handled yet");
      }
    }
  }

  return next(action);
};