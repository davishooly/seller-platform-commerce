import React, {lazy} from 'react';
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
import {connect } from "react-redux";
import {connectRequest} from "redux-query-react";
import {compose} from "redux";
import { sellerFromToken } from "../../api/src/apis";
import {getProductsCategories} from "../../state/product";
import Edit from 'pages/Dasboard/inventory/Edit';
import ResetPassword from "../../pages/Auth/resetPassword";
import useBeforeUnload from "use-before-unload/lib";

const ErrorPage = lazy(() => import("../../pages/Error/error"));



export const errorPageRoute = () => (
    <>
        <Route path={"/"}>
            <ErrorPage/>
        </Route>
    </>
);



export const HomeRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Route path="/new" exact >
                <NewSeller/>
            </Route>
            { errorPageRoute() }
        </Switch>
    );
};

export const AuthRoutes = () => (
    <Switch>
        <Route path="/login" exact>
            <Register/>
        </Route>
        { errorPageRoute() }
    </Switch>

);

export const ResetPasswordRoute = () => (
    <Switch>
        <Route path="/checkpoint/request-password-reset" exact>
            <ResetPassword/>
        </Route>
        { errorPageRoute() }
    </Switch>
);

export const AccountActivationRoutes = () => (
    <Switch>
        <Route path={"/activate/:userId/:token"} render={(props: any) => <ActivationPage {...props} />}/>
    </Switch>
);


const DashboardRoutesL = (props: any) => {

    useBeforeUnload(evt => {
        /* Do some checks here if you like */
        return true; // Suppress reload
    });

    return (
        <Switch>
            <Route path="/dashboard/settings">
                <Settings/>
            </Route>
            <Redirect exact from="/dashboard/inventory" to='/dashboard/inventory/manage'/>
            <Route  path="/dashboard/inventory/edit/:id">
                <Edit/>
            </Route>
            <Route  path="/dashboard/inventory">
                <Inventory/>
            </Route>
            <Route exact path="/dashboard/payout">
                <PayoutTaxes/>
            </Route>
            <Route path="/dashboard/orders">
                <Orders/>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard/>
            </Route>
            { errorPageRoute() }
        </Switch>
    );
};

const mapStateToProps = (state: any) => ({
    seller: state.entities.seller,
    rootCategories: state.entities.rootCategories,
    auth: state.auth
});

const mapPropsToConfig = (props: any): any => {
    const actions = [
        sellerFromToken(
            {
                transform: (responseBody: any) => {
                    return {
                        seller: responseBody,
                    }
                },
                update: {
                    seller: (prev: any, next: any) => next
                }
            }
        ),
        getProductsCategories(props.rootCategories),
    ];
    return actions;
};

export default compose(
    connect(mapStateToProps),
    connectRequest(mapPropsToConfig)
)(DashboardRoutesL);

export const ROUTES = {
    inventory: "/dashboard/inventory"
};

