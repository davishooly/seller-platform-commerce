import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Menu from '../menu';
import Users from '../settings/users';
import Container from 'components/Common/Center';
import Payout from './payout';

const PayoutTaxes = () => {
    return (
        <>
            <Menu>
                <li>
                    {' '}
                    <NavLink to="/dashboard/payout" activeClassName="active" exact>
                        {' '}
                        Payout
                    </NavLink>{' '}
                </li>
                <li>
                    {' '}
                    <NavLink to="/dashboard/payout/payments" activeClassName="active" exact>
                        {' '}
                        Payment & Tax Setup{' '}
                    </NavLink>{' '}
                </li>
                <li>
                    {' '}
                    <NavLink to="/dashboard/payout/statements" activeClassName="active" exact>
                        {' '}
                        Statements{' '}
                    </NavLink>
                </li>
                <li>
                    {' '}
                    <NavLink to="/dashboard/payout/requests" activeClassName="active" exact>
                        {' '}
                        Request Payout{' '}
                    </NavLink>
                </li>
            </Menu>

            <Container>
                <Switch>
                    <Route path="/dashboard/payout" exact component={Payout} />
                    <Route path="/dashboard/settings/users" exact component={Users} />
                </Switch>
            </Container>
        </>
    );
};

export default PayoutTaxes;
