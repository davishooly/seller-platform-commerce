import React from 'pages/Dasboard/settings/node_modules/react';
import { NavLink, Route, Switch } from 'pages/Dasboard/settings/node_modules/react-router-dom'
import styled from "pages/Dasboard/settings/node_modules/styled-components"
import Menu from '../menu';
import Container from '../../../components/common/container';
import ShopInfo from './shopinfo';
import Users from './users';



const StyledSettings = styled.div`
    
`

const Settings = () => {
    return (
        <StyledSettings>
            <Menu>

                <li> <NavLink to="/dashboard/settings" activeClassName="active" exact> Shop </NavLink></li>
                <li> <NavLink to="/dashboard/settings/users" activeClassName="active" exact> Authorized Users </NavLink> </li>
                <li> <NavLink to="/dashboard/settings/payments" activeClassName="active" exact>  Payment Info </NavLink></li>
            </Menu>

            <Container>
                <Switch>
                    <Route path="/dashboard/settings" exact component={ShopInfo}/>
                    <Route path="/dashboard/settings/users" exact component={Users}/>
                </Switch>

            </Container>



        </StyledSettings>
    );
};
export default Settings;
