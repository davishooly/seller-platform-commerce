import React from "react";
import {Route, Switch, withRouter } from 'react-router-dom'
import requireAuthentication from "../RequireAuthentication";
import MainLayout, {DashboardLayout} from "../../components/Layout";
import DashboardRoutes, {HomeRoutes, AuthRoutes, AccountActivationRoutes} from "./routes";


const AuthedRoutes: React.FunctionComponent<any> = () => {
    return <>
        <DashboardLayout>
            <DashboardRoutes/>
        </DashboardLayout>
    </>;
};

// TODO add code spliting
class Routing extends React.Component<any, {}> {

    private PreAuthedRoutes = requireAuthentication(AuthedRoutes);

    render() {
        const Routes = this.PreAuthedRoutes;
        return (
            <Switch>
                <Route path='/login'>
                    <AuthRoutes/>
                </Route>
                <Route path={"/activate/:userId/:token"}>
                    <AccountActivationRoutes/>
                </Route>
                <Route path="/dashboard">
                    <Routes/>
                </Route>

                <Route path="/">
                    <MainLayout>
                        <HomeRoutes/>
                    </MainLayout>
                </Route>
            </Switch>
        );
    }
}

export default Routing;
