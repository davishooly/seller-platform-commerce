import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import requireAuthentication from "../RequireAuthentication";
import { DashboardLayout } from "../../components/Layout";
import { HomeRoutes, AuthRoutes, AccountActivationRoutes} from "./routes";

/**
 * code splitting -> faster page load time
 *  Add dynamic import on route level components to improve performance
 */

const DashboardRoutes = lazy(() =>import("./routes"));
const MainLayout  =  lazy(() => import("../../components/Layout"));
const ErrorPage = lazy(() => import("../../pages/Error/error"));


const AuthedRoutes: React.FunctionComponent<any> = () => {
    return <>
        <DashboardLayout>
            <DashboardRoutes/>
        </DashboardLayout>
    </>;
};

// TODO add code spliting
class Routing extends React.Component<any, {}> {

    state = {
        isLoaded: false
    };

    private PreAuthedRoutes = requireAuthentication(AuthedRoutes);

    render() {
        const Routes = this.PreAuthedRoutes;
        return (
            <Suspense fallback={<div>...loading</div>}>
            <Switch>
                <Route exact path='/login'>
                    <AuthRoutes/>
                </Route>
                <Route exact path={"/activate/:userId/:token"}>
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
                <Route to={"/404"}>
                    <ErrorPage/>
                </Route>
                <Redirect to={"/404"} />

            </Switch>
            </Suspense>
        );
    }
}

export default Routing;
