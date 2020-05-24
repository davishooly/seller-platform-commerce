import React from 'react';
import  LoginContent from "./loginContent";
import Footer from "components/Layout/Footer/index";
import  { ReactComponent as Logo} from "icons/omaar-logo.svg";

import { HeaderContainer, Container , RegisterContainer } from './styles';



const Register = (props: any) => {

    return (
        <>
            <HeaderContainer>
                <div className="container">
                    <div className="navbar-header">
                        <Logo/>
                    </div>
                </div>
            </HeaderContainer>

            <RegisterContainer>
                <div className="modal__container">
                    <Container>
                        <LoginContent />
                    </Container>
                </div>

            </RegisterContainer>
            <Footer/>
        </>
    );
};
export default Register;









