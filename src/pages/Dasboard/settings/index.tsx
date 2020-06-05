import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom'
import styled from "styled-components"
import Menu from '../menu';
import Container from 'components/Common/Container';
import ShopInfo from './shopinfo';
import Users from './users';
import {errorPageRoute} from "../../../containers/Routing/routes";
import Payment from "./payments";
import useBeforeUnload from "use-before-unload/lib";
import {useSelector} from "react-redux";
import {useMutation, useRequest} from "redux-query-react";
import {readSeller, updateSeller} from "../../../state/seller";
import {Button, Col} from "antd";


const StyledSettings = styled.div`
    
`;

const Settings = () => {

    const seller = useSelector((state: any) => state.entities.seller);
    const [ {}] = useRequest(readSeller(seller?.id));

    const sellerInfo = useSelector(((state: any) => state.entities.sellerInfo));

    const [{ isPending }, updateSellerDetails] =  useMutation( () => updateSeller(seller.id, sellerInfo));

    const handleSubmit = (e:any) => {
        e.preventDefault();
        updateSellerDetails();
    };

    useBeforeUnload(evt => {
        /* Do some checks here if you like */
        return true; // Suppress reload
    });

    return (
        <StyledSettings>
            <Menu>

                <li> <NavLink to="/dashboard/settings" activeClassName="active" exact> Shop </NavLink></li>
                <li> <NavLink to="/dashboard/settings/me" activeClassName="active" exact> My profile </NavLink> </li>
                <li> <NavLink to="/dashboard/settings/payments" activeClassName="active" exact>  Payment Info </NavLink></li>
            </Menu>

            <Container>
                <Switch>
                    <Route path="/dashboard/settings" exact component={ShopInfo}/>
                    <Route path="/dashboard/settings/me" exact component={Users}/>
                    <Route path="/dashboard/settings/payments" exact component={Payment}/>
                    { errorPageRoute() }
                </Switch>

                <Button loading={isPending} onClick={handleSubmit} type="primary" style={{ marginTop: "2rem" }}>
                    Update
                </Button>


            </Container>



        </StyledSettings>
    );
};
export default Settings;
