import React from 'react';
import styled from "styled-components";
import  ModalContent from "./loginContent";
import Footer from "components/Layout/Footer/index";
import  { useCustomModalChange } from 'components/Layout/Header/index'
import { withRouter } from 'react-router-dom';

const RegisterContainer = styled.div`
 margin: 0 auto;
 width: 70%;
 height: 80vh;
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
    height: 8vh;
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
            <RegisterContainer>
                <div className="modal__container title">
                    <h1> OE Seller central </h1>
                </div>
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









