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

const ErrorPage = lazy(() => import("../../pages/Error/error"));



const errorPageRoute = () => (
    <>
        <Route path={"/404"}>
            <ErrorPage/>
        </Route>
        <Redirect to={"/404"} />
        </>
);



export const HomeRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/new" exact >
                <NewSeller/>
            </Route>
            { errorPageRoute() }
        </Switch>
    );
};

export const AuthRoutes = () => (
    <Switch>
        <Route path="/login" exact component={Register}/>
        { errorPageRoute() }

    </Switch>

);

export const AccountActivationRoutes = () => (
    <Switch>
        <Route path={"/activate/:userId/:token"} render={(props: any) => <ActivationPage {...props} />}/>
    </Switch>
);


const DashboardRoutesL = (props: any) => {

    return (
        <Switch>
            <Route exact path="/dashboard/settings" component={Settings}/>
            <Redirect exact from="/dashboard/inventory" to='/dashboard/inventory/manage'/>
            <Route  path="/dashboard/inventory/edit/:id" component={Edit}/>
            <Route  path="/dashboard/inventory" component={Inventory}/>
            <Route exact path="/dashboard/payout" component={PayoutTaxes}/>
            <Route exact path="/dashboard/orders" component={Orders}/>
            <Route exact path="/dashboard" component={Dashboard}/>
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
        sellerFromToken( {},
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
        getProductsCategories(props.rootCategories)
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

