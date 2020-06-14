import React, { Component } from 'react';
import { Action, AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

interface StateProps {
    isLoggedIn: boolean;
    refreshToken: string;
}

interface ConnectedReduxProps<A extends Action = AnyAction> {
    // Correct types for the `dispatch` prop passed by `react-redux`.
    // Additional type information is given through generics.
    dispatch: Dispatch<A>;
}

// TODO: Fix out how to re-type this as React.ComponentType<P> properly
// eslint-disable-next-line @typescript-eslint/ban-types
export default <P extends {}>(ChildComponent: React.ComponentType<P>): React.ComponentType => {
    class AuthenticatedComponent extends Component<P & StateProps> {
        render() {
            const { isLoggedIn }: any = this.props;
            if (isLoggedIn) {
                return <ChildComponent {...(this.props as P)} />;
            } else {
                return <Redirect from="/dashboard" exact to="/login" />;
            }
        }
    }

    const mapStateToProps = (state: any): StateProps => {
        return {
            isLoggedIn: !!state.auth.accessToken,
            refreshToken: state.auth.refreshToken,
        };
    };

    return connect(mapStateToProps, null)(AuthenticatedComponent as any);
};
