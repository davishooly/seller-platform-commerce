import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { RequestAsyncAction, MutateAsyncAction } from 'redux-query';

export const authHeader: Middleware = (api: MiddlewareAPI<Dispatch<AnyAction>>) => (next: Dispatch) => (
    action: AnyAction | RequestAsyncAction | MutateAsyncAction,
) => {
    if (action.type === '@@query/REQUEST_ASYNC' || action.type === '@@query/MUTATE_ASYNC') {
        const queryAction = action;
        if (queryAction.meta && queryAction.meta.authType && queryAction.meta.authType[0] === 'oauth') {
            const token = api.getState().auth.accessToken;
            const expiry = api.getState().auth.smiles;
            const now = new Date();
            // const range = now.getTime() - expiry;
            // if (range > -1000) {
            //     api.dispatch({
            //         type: 'AUTH-REFRESH',
            //     });
            // }
            if (token) {
                queryAction.options.headers.authorization = `Bearer ${token}`;
            } else {
                // throw new Error("Missing accessToken scenario is not handled yet");
            }
        }
    }

    return next(action);
};
