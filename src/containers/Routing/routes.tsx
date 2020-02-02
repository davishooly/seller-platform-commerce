import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import Home from 'pages/Home/index';
import NewSeller from 'pages/NewSeller';
import Settings from 'pages/Dasboard/settings';
import Dashboard from 'pages/Dasboard';
import Inventory from 'pages/Dasboard/inventory';
import PayoutTaxes from "pages/Dasboard/payoutTaxes/index";
import Orders from "pages/Dasboard/orders";
import Register from "../../pages/Auth";
import ActivationPage from "../../pages/ActivateAccount";
import {connect} from "react-redux";
import {connectRequest} from "redux-query-react";
import {compose} from "redux";
import {sellerFromToken} from "../../api/src/apis";
import {useSeller} from "../../state/seller";


export const HomeRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/new" exact>
                <NewSeller/>
            </Route>
        </Switch>
    );
};

export const AuthRoutes = () => (
    <Switch>
        <Route path="/login" exact component={Register}/>
    </Switch>

);

export const AccountActivationRoutes = () => (
    <Switch>
        <Route path={"/activate/:userId/:token"} render={(props: any) => <ActivationPage {...props} />}/>
    </Switch>
);


const DashboardRoutesL = (props: any) => {
    // const sellers = useSeller()
    // console.log(sellers)
    return (
        <Switch>
            <Route path="/dashboard/settings" component={Settings}/>
            <Redirect exact from="/dashboard/inventory" to='/dashboard/inventory/manage'/>
            <Route path="/dashboard/inventory" component={Inventory}/>
            <Route path="/dashboard/payout" component={PayoutTaxes}/>
            <Route path="/dashboard/orders" component={Orders}/>
            <Route path="/dashboard" component={Dashboard}/>
        </Switch>
    );
};

const mapStateToProps = (state: any) => ({
    seller: state.entities.seller
});

const mapPropsToConfig = (props: any): any => {
    const actions = [
        sellerFromToken(
            {
                transform: (responseBody: any) => {
                    console.log({responseBody})
                    return {
                        seller: responseBody,
                    }
                },
                update: {
                    seller: (prev: any, next: any) => next
                }
            }
        )
    ];

    console.log({actions})
    return actions;
};

export default compose(
    connect(mapStateToProps),
    connectRequest(mapPropsToConfig)
)(DashboardRoutesL);

export const ROUTES = {
    inventory: "/dashboard/inventory"
};
