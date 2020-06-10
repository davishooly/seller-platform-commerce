import React, {useContext} from 'react';
import {Link } from 'react-router-dom';
import styled from "styled-components";
import Button from "components/Button";
import Image from 'icons/background.jpeg'
import ThemeContext from "../../providers/themes/ThemeContext";
import {ThemesType} from "../../providers/themes/ThemeTypes";
import { device } from 'mediaScreen/mediaQueries';


const StyledLanding = styled.div<ThemesType>`
  display: flex;
  height: 82vh;
  justify-content: center;
  align-items: center;
  background-image: url(${Image});
  background-color: ${props => props.greyBackground};
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
    background: ${props => props.radialGradient};
    opacity: 1;
  }
  .landing {
    display: grid;
    place-items: center;
    height: 35vh;
    z-index: 1;
    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
      text-align: center;
    } 
  }
  span {
    color: ${props => props.textColor};
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

    const { themes } = useContext(ThemeContext);


    return (
        <>
            <StyledLanding { ...themes }>
                <div className="landing">
                    <span className="title">Want to Sell Your Items on OE?</span>
                    <span>Start selling where thousands of customers are shopping every day.</span>
                    <span>You’re just a few steps away from becoming a seller on OE.</span>
                    <ButtonContainer>
                        <Link to="/new">
                            <Button register> Register to sell</Button>
                        </Link>
                        <Link to="/login">
                            <Button signin> Sign in</Button>
                        </Link>
                    </ButtonContainer>
                </div>
            </StyledLanding>

        </>
    );
};

export default Landing;
