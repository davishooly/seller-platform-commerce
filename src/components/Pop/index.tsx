import React, { useEffect, useRef } from 'react';
import Styled,  { css } from 'styled-components';

const PopContainer =  Styled.div<any>`
  height: 200px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
  z-index: 999;
  position: absolute;
  right: 10%;
  background-color: #FFFFFF;
  border-radius: 4px;
  
  ${props => props.logout && css `
     top: 78%;
  `}
  .ant-popover-arrow {
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    position: absolute;
    display: block;
    width: 12px;
    height: 12px;
    background: #fff;
    border-style: solid;
    border-width: 4.24264069px;
    top: -6px;
    border-top-color: #fff;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #fff;
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
  }
`;

const Index = ({isOpen, children, setOpenPop, logout }: any ) => {
    const ref = useRef(null);

    const updatePopView = (e: any) => {
        // @ts-ignore
        if (ref.current !== null && !ref.current.contains(e.target)) {
            // @ts-ignore
            setOpenPop(!isOpen);
        }
    };

    useEffect(() => {
        document.addEventListener("click",updatePopView);
        return () => document.removeEventListener("click", updatePopView)
    }, [updatePopView]);
    return (
        <>{
            isOpen ? (
                <PopContainer logout ref={ref}>
                    <div className="ant-popover-arrow"/>
                    {children}
                </PopContainer>
            ) : ''
        }
        </>
    );
};

export default Index;
