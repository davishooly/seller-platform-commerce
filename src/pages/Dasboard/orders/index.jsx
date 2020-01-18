import React from "pages/Dasboard/orders/node_modules/react";
import Menu from "../menu";
import {NavLink, Route, Switch} from "pages/Dasboard/orders/node_modules/react-router-dom";
import Container from "../../../components/common/container";
import Users from "../settings/users";
import ManageOrders from "./manageOrders";

const Orders = () => {
  return (
      <>
        <Menu>
          <li> <NavLink to="/dashboard/orders" activeClassName="active" exact> Manage Orders</NavLink> </li>
          <li> <NavLink to="/dashboard/orders/reports" activeClassName="active" exact> Order Reports </NavLink> </li>
          <li> <NavLink to="/dashboard/orders/returns" activeClassName="active" exact> Manage Returns </NavLink></li>
        </Menu>


        <Container>
          <Switch>
            <Route path="/dashboard/orders" exact component={ManageOrders}/>
            <Route path="/dashboard/orders/users" exact component={Users}/>
          </Switch>

        </Container>
      </>
  )

};

export default Orders;
