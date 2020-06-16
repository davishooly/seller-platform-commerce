import React from 'react';
import Menu from '../menu';
import { NavLink, Route, Switch } from 'react-router-dom';
import Container from 'components/Common/Container';
import ManageOrders from './manageOrders';
import ReturnPage from './Returns';
import { errorPageRoute } from '../../../containers/Routing/routes';
import { CustomMenu } from '../inventory';

const Orders = () => {
    return (
        <CustomMenu>
            <Menu className="menu">
                <li>
                    {' '}
                    <NavLink to="/dashboard/orders" activeClassName="active" exact>
                        {' '}
                        Manage Orders
                    </NavLink>{' '}
                </li>
                {/*<li> <NavLink to="/dashboard/orders/reports" activeClassName="active" exact> Order Reports </NavLink> </li>*/}
                <li>
                    {' '}
                    <NavLink to="/dashboard/orders/returns" activeClassName="active" exact>
                        {' '}
                        Manage Returns{' '}
                    </NavLink>
                </li>
            </Menu>

            <Container>
                <Switch>
                    <Route path="/dashboard/orders" exact component={ManageOrders} />
                    <Route path="/dashboard/orders/returns" exact component={ReturnPage} />
                    {errorPageRoute()}
                </Switch>
            </Container>
        </CustomMenu>
    );
};

export default Orders;
