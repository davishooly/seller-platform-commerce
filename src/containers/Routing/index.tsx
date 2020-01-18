import * as React from "react";
import { Router, RouteComponentProps, Match } from "@reach/router";

import requireAuthentication from "../RequireAuthentication";
import { NewSeller } from "pages";
import Home from "../../pages/Home";
import Dashboard from "../../pages/Dasboard";

const AuthedRoutes: React.FunctionComponent<RouteComponentProps> = () => {
  return <React.Fragment></React.Fragment>;
};

// TODO add code spliting
class Routing extends React.Component<any, {}> {
  private PreAuthedRoutes = requireAuthentication(AuthedRoutes);
  render() {
    const Routes = this.PreAuthedRoutes;
    return (
        <Router>
            <Home path="/" />
            <Dashboard path={"dashboard"}/>
            <NewSeller path="/new" />
        </Router>
    );
  }
}

export default Routing;
