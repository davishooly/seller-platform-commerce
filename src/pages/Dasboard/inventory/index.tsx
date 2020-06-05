import React from 'react';
import { NavLink, Route, Switch } from "react-router-dom"
import Menu from '../menu';
import Container from '../../../components/Common/Container';
import NewProduct from './new';
import ManageInventory from "./manageInventory";
import OeExpress from "./oeExpress";


const Inventory = () => {
   return (
        <>
            <Menu>

                <li> <NavLink to="/dashboard/inventory/manage" activeClassName="active" exact> Manage Inventory </NavLink></li>
                <li> <NavLink to="/dashboard/inventory/new" activeClassName="active" exact> Add a Product </NavLink> </li>
                <li> <NavLink to="/dashboard/inventory/oeexpress" activeClassName="active" exact>  OE Express </NavLink></li>

            </Menu>

            <Container>
                <Switch>
                  <Route path="/dashboard/inventory/new" exact component={NewProduct} />
                  <Route path="/dashboard/inventory/manage" exact component={ManageInventory} />
                  <Route path="/dashboard/inventory/oeexpress" exact component={OeExpress}/>
                </Switch>
            </Container>
        </>
    );
};

export default Inventory;
