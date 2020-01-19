import React from "react";
import {Table} from "antd";
import Styled from 'styled-components';

import {TableSection} from "components/Table/styles";
import { columns } from './fixtures/tableColumns'
import dataSources from "./fixtures/dataSources";

const Contianer = Styled.div`
   display: flex;
   width: 97.09%;
   height: 111px;
   flex-direction: column;
   background: #7073AF;
   padding: 10px;
   justify-content: space-around;
   .container__title {
     color:#FFFFFF;
     font-size: 18px;
     line-height 21px;
     letter-spacing: .5px;
   }
   
   .summary__container{
     display: flex;
     justify-content: space-between;
   }
   
`;

const Span = Styled.span`
    color:#FFFFFF;
    font-size: 14px;
    line-height 16px;
    letter-spacing: .44px;
`;

const Div = Styled.div`
   span: last-of-type {
     border-left: 1px solid rgba(255,255,255,0.5);
     padding: 10px;
   }
   span: first-of-type {
     padding-right: 10px
   }
`;

const Button = Styled.button`
  background: #E6F1FC;
  border: none;
  border-radius: 3px;
  font-family: "Proxima Nova Regular";
  font-size: 12px;
  color: #203341;
  line-height 14px;
`;




const Payout = () => {
  return (
      <>
       <Contianer>
         <div className="container__title">Payment Summary</div>
         <div className="summary__container">
           <Span> Most recent payment </Span>
           <Div>
             <Span> KES 1,009,078 </Span>
             <Span> Balance </Span>
           </Div>
           <Div>
             <Span> KES 29,009.55 </Span>
             <Span> All Payments </Span>
           </Div>
           <Span> KES 2,029,078.55 </Span>
         </div>
       </Contianer>
        <TableSection>
          <div className="head">
            <span> Payout History </span>
            <Button> Download CSV </Button>
          </div>
          <Table columns={columns}  dataSource={dataSources}/>
        </TableSection>
      </>
  )
};

export default Payout;
