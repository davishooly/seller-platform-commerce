import { authTokensCreate } from 'api/src/apis';

export interface Login {
    email: string;
    password: string;
}

export const loginSeller = (userCredentials: Login) => {
    const config = authTokensCreate({
        data: {
            email: userCredentials.email,
            password: userCredentials.password,
        },
    });

    return config;
};
