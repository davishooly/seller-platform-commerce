const SET_AUTH = "SET_AUTH";
const REMOVE_AUTH = "REMOVE_AUTH";

export function reducer(state:any = {}, action: any) {
  switch (action.type) {
    case SET_AUTH:
      return Object.assign({}, state, {
        accessToken: action.auth.accessToken,
        refreshToken: action.auth.refreshToken,
        smiles: action.auth.expiresIn,
        timeout: false
      });

    case REMOVE_AUTH:
      return {
        accessToken: "",
        refreshToken: "",
        smiles:''
      };

    case "AUTH-REFRESH":
      const now  =  new Date();
          return  Object.assign({}, state, {
            ...state,
            smiles: now.getTime() + 36000,
            timeout: true
          });
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

