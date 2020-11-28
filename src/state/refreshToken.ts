import { refreshAuthToken } from '../api/src/apis';
import { setStoreTokens } from './auth';

export const getTokenRefreshed = (refreshToken: string, dispatch: any) => {
    return refreshAuthToken(
        {
            data: {
                refreshToken: refreshToken,
            },
        },
        {
            transform: (body: any) => ({
                token: body,
            }),
            update: {
                token: (prev: any, next: any) => {
                    const { accessToken, refreshToken, expiresIn } = next;
                    const now = new Date();
                    dispatch(
                        setStoreTokens({
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            expiresIn: now.getTime() + expiresIn,
                            timeout: false,
                        }),
                    );
                    return next;
                },
            },
        },
    );
};
