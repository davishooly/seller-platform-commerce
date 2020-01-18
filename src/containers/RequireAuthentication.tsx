import React, { Component } from "react";
import { Action, AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";


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
export default <P extends {}>(
  ChildComponent: React.ComponentType<P>
): React.ComponentType => {
  class AuthenticatedComponent extends Component<P & StateProps> {
    // componentWillMount() {
    //   checkAuthentication(this.props);
    // }
    render() {
      return <ChildComponent {...(this.props as P)} />;
    }
  }

  const mapStateToProps = (s: any): StateProps => {    
    return {
      isLoggedIn: !!s.auth.refreshToken,
      refreshToken: s.auth.refreshToken
    };
  };

  return connect(mapStateToProps, null)(AuthenticatedComponent as any);
};
