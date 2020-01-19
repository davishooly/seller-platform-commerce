import React from 'react';
import styled from "styled-components"
import Header, { DashboardHeader } from "./Header";
import Footer from "./Footer";


const Content = styled.main`
    grid-area: content;
`;
const StyledLayout = styled.div`
    display: grid;
    min-height: 100vh;

    grid-template-areas:
    "header"
    "content"
    "footer";

    grid-template-rows: auto 2fr auto;

`;

const MainLayout = ({ children }: any) => {
    return (
        <StyledLayout>
            <Header />
        <Content>
            { children }
        </Content>
        <Footer />
        </StyledLayout>
    );
};

export const DashboardLayout = ({ children }: any) => {
    return (
        <StyledLayout>
            <DashboardHeader />
        <Content>
            { children }
        </Content>
        </StyledLayout>
    );
};

export default MainLayout;
