import React, { Component } from "react";
import { Action, AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


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
    render() {
      if(this.props.isLoggedIn){
        return <ChildComponent {...(this.props as P)} />;
      }
      else{
       return  <Redirect exact from="/dashboard"  to='/login'/>
      }
    }
  }

  const mapStateToProps = (state: any): StateProps => {
    return {
      isLoggedIn: !!state.auth.refreshToken,
      refreshToken: state.auth.refreshToken
    };
  };

  return connect(mapStateToProps, null)(AuthenticatedComponent as any);
};
