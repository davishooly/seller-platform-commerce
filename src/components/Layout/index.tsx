import React from 'react';
import styled from 'styled-components';
import Header, { DashboardHeader } from './Header';
import Footer from './Footer';

import { device } from 'mediaScreen/mediaQueries';
import { useWindowSize } from 'react-use';
import { Hamburger } from '../Menu/hamburger';

const Content = styled.main`
    grid-area: content;
`;
const StyledLayout = styled.div`
    display: grid;
    min-height: 100vh;

    grid-template-areas:
        'header'
        'content'
        'footer';

    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
        header {
            display: none;
        }
    }

    grid-template-rows: auto 2fr auto;
`;

export const menuItems = [
    { path: '/', name: 'Home' },
    { path: '/login', name: 'Login' },
    { path: '/new', name: 'New seller' },
];

export const dashboardMenus = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/dashboard/inventory', name: 'Inventory' },
    { path: '/dashboard/orders', name: 'Orders' },
    { path: '/dashboard/payout', name: 'Payout' },
    { path: '/dashboard/settings', name: 'Settings' },
];

const MainLayout = ({ children }: any) => {
    const { width } = useWindowSize();
    return (
        <StyledLayout>
            {width > 768 ? <Header /> : <Hamburger menuItems={menuItems} />}
            <Content>{children}</Content>
            <Footer />
        </StyledLayout>
    );
};

export const DashboardLayout = ({ children }: any) => {
    const { width } = useWindowSize();
    return (
        <StyledLayout>
            {width > 768 ? <DashboardHeader /> : <Hamburger menuItems={dashboardMenus} />}
            <Content>{children}</Content>
        </StyledLayout>
    );
};

export default MainLayout;
