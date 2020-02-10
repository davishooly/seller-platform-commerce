import { authRefreshCreate } from "../api/src/apis";
import { setStoreTokens } from "./auth";


export const getTokenRefreshed = ( refreshToken: string, dispatch: any ) => {
      return authRefreshCreate({
        data:  {
            grantType: "refresh_token",
            refreshToken: refreshToken
        }
    }, {
        transform:(body: any) => ({
            token: body
        }),
        update: {
            token: (prev:any , next: any) => {
                const { accessToken, refreshToken, expires_in  } = next
                const now  =  new Date();
                dispatch(setStoreTokens({
                    accessToken:  accessToken,
                    refreshToken: refreshToken,
                    expiresIn: now.getTime() + expires_in,
                    timeout: false
                }))
                return next
            }
        }
    })
};
