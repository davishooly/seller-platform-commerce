import React from 'react';
import styled from "styled-components";
import  ModalContent from "./loginContent";
import Footer from "components/Layout/Footer/index";
import  { useCustomModalChange } from 'components/Layout/Header/index'
import { withRouter } from 'react-router-dom';

import  { ReactComponent as Logo} from "icons/omaar-logo.svg";


const HeaderContainer = styled.div`
    background-color: #fff;
    min-height: 65px;
    box-shadow: 0 1px 6px rgba(57,73,76,.35);
   svg path {
    fill: #006DBF;
   }    
    .container {
     position: relative;
     margin-left: auto;
     width: 990px;
     margin-right: auto;
     padding-right: 15px;
     padding-left: 15px;
    }
    .navbar-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 65px;
    height: 55px;
    flex-basis: 100%;
    }
`;

const RegisterContainer = styled.div`
 margin: 60px auto 60px auto;
 width: 70%;
 display: flex;
 flex-direction: column;
 .modal__container {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
     font-size: 18px;
  }
 }
 .title {
    margin-top: 20px;
  }
`;

const Container = styled.div`
 height: 60vh;
 width: 50%;
 box-shadow: 0 1px 6px rgba(57,73,76,0.35);
 display: flex;
 justify-content: center;
`;

const Register = (props: any) => {
    const { handleModalChange } = useCustomModalChange();

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
                <div className=" modal__container">
                    <Container>
                        <ModalContent modalIcon={false} onClick={handleModalChange} modalChange signUpModal={false}/>
                    </Container>
                </div>

            </RegisterContainer>
            <Footer/>
        </>
    );
};
export default withRouter(Register);









