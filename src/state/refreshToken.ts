import { authRefreshCreate } from "../api/src/apis";


export const getTokenRefreshed = ( refreshToken: string ) => {
      return authRefreshCreate({
        data:  {
            grantType: "refreshToken",
            refreshToken: refreshToken
        }
    }, {
        transform:(body: any) => ({
            token: body
        }),
        update: {
            token: (prev:any , next: any) => {
                console.log({ next })
                return next
            }
        }
    })
};
