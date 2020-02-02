import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from 'pages/Home/index';
import NewSeller from 'pages/NewSeller';
import Settings from 'pages/Dasboard/settings';
import Dashboard from 'pages/Dasboard';
import Inventory from 'pages/Dasboard/inventory';
import PayoutTaxes from "pages/Dasboard/payoutTaxes/index";
import Orders from "pages/Dasboard/orders";
import Register from "../../pages/Auth";
import ActivationPage from "../../pages/ActivateAccount";



const HomeRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/new" exact>
                <NewSeller />
            </Route>
        </Switch>
  );
};

export const AuthRoutes = () => (
    <Switch>
        <Route path="/login" exact component={Register} />
</Switch>

);

export const AccountActivationRoutes = () => (
    <Switch>
        <Route path={"/activate/:userId/:token"} render={(props: any) => <ActivationPage {...props } />} />
    </Switch>
);


export const DashboardRoutes = () => {
    return (
            <Switch>
                <Route path="/dashboard/settings" component={Settings} />
                <Redirect exact from="/dashboard/inventory"  to='/dashboard/inventory/manage'/>
                <Route path="/dashboard/inventory" component={Inventory} />
                <Route path="/dashboard/payout" component={PayoutTaxes} />
                <Route path="/dashboard/orders" component={Orders} />
                <Route path="/dashboard"  component={Dashboard}/>
            </Switch>
   );
};


export const ROUTES = {
    inventory: "/dashboard/inventory"
};

export default HomeRoutes
