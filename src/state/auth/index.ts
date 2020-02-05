import { requestAsync } from 'redux-query';
import { getTokenRefreshed } from "../refreshToken";

const SET_AUTH = "SET_AUTH";
const REMOVE_AUTH = "REMOVE_AUTH";

export function reducer(state = {}, action: any) {
  switch (action.type) {
    case SET_AUTH:
      return Object.assign({}, state, {
        accessToken: action.auth.accessToken,
        refreshToken: action.auth.refreshToken,
        smiles: action.auth.expiresIn
      });

    case REMOVE_AUTH:
      return {
        accessToken: "",
        refreshToken: "",
        smiles:''
      };

    case "AUTH-REFRESH":
      console.log("finally called", action)
          return state

    default:
      return state;
  }
}

export const setStoreTokens = function(auth: any) {
  return { type: SET_AUTH, auth: auth };
};

export const removeTokens = function() {
  return { type: REMOVE_AUTH };
};


export const setRefreshToken = () => {
  // api.dispatch(requestAsync(getTokenRefreshed(refreshToken)))
  const now  =  new Date();

  return {
    accessToken:  "0d141BBT7b0IhnQ6N0zlyhMuLKuw58",
    refreshToken: "3YCJzR96yYFz1fdLvyPvrFw4UoPAXk",
    expiresIn: now.getTime() + 20
  }
};

export interface loginState {
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Gets initial auth state from storage.
 */
export function getInitialAuthState(): loginState {
  const accessToken =
    window.localStorage.getItem(ACCESS_TOKEN_KEY) || undefined;
  const refreshToken =
    window.localStorage.getItem(REFRESH_TOKEN_KEY) || undefined;

  return {
    accessToken,
    refreshToken
  };
}

// Constants
export const CODE_VERIFIER_KEY = "codeVerifier";
export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";


export const setToken = function(accessToken: any, refreshToken: any) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
};

export const getTokens = (body: any) => {
  const queryConfig = {
    url: `/o/token/`,
    body: body,
    transform: (responseBody  : any) => {
      return {
        auth: responseBody
      }
    },
    update: {
      auth: (prev: any, next: any) => next,
    },
  };
  return queryConfig;
};
