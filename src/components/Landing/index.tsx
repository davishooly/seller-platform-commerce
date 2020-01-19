import React from 'react';
import {Link } from 'react-router-dom';
import styled from "styled-components";
import Button from "components/Button";
import Image from 'icons/background.jpeg'


const StyledLanding = styled.div`
    display: flex;
    height: 82vh;
    justify-content: center;
    align-items: center;
    background-image: url(${Image});
    background-color: #cccccc;
    background-repeat:  no-repeat;
    background-size: cover;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: 0%;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle, rgba(96,116,131,0.95) 0%, rgba(33,45,56,0.9) 100%);
        opacity: 1;
  }
    .landing {
        display: grid;
        place-items: center;
        height: 35vh;
        z-index: 1;
    }
    span {
    color: #FFFFFF;
    }
    .title {
     font-size: 28px;
    }
    span: nth-child(2){
    font-size: 20px;
    }
    span: nth-child(3){
    font-size: 16px;
    }
`;

const ButtonContainer = styled.div`
 display: flex;
 width: 300px;
 justify-content: space-evenly;
`;

const Landing = () => {

    return (
        <>
            <StyledLanding>
                <div className="landing">
                    <span className="title">Want to Sell Your Items on OE?</span>
                    <span>Start selling where thousands of customers are shopping every day.</span>
                    <span>You’re just a few steps away from becoming a seller on OE.</span>
                    <ButtonContainer>
                        <Link to="/auth/register">
                            <Button register> Register to sell</Button>
                        </Link>
                        <Link to="/auth/login">
                            <Button signin> Sign in</Button>
                        </Link>
                    </ButtonContainer>
                </div>
            </StyledLanding>

        </>
    );
};

export default Landing;
