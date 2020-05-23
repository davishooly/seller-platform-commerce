import React from 'react';
import { Divider } from "antd";

import  { FormOutlined } from '@ant-design/icons'

import styled from "styled-components";


export const Container = styled.div`
  margin-bottom : 40px;
  .section {
     display: flex;
     width: 100%;
  }
  
  .section__title {
     display: flex;
     width: 100%;
     justify-content: space-between;
     font-size: 24px;
     color: rgba(0, 0, 0, 0.85);
     
     .anticon {
        color: #1890ff;
        font-size: 16px;
        cursor: pointer;
     }
   }
`;

interface Section {
  section: string,
  path: number,
  content?:string
}


const sections = [
  { section: "Seller Agreement", path: 0},
  { section: "User Information", path: 1 },
  { section: "Business Details", path: 2},
  { section: "Payment Information", path: 3}
];



const previewSections = ({ section, path}: Section, setCurrent: Function) => (
    <>
      <Divider/>
      <div className="section">
        <div className="section__title">
          <span > { section } </span>
          <FormOutlined onClick={() => setCurrent(path)}/>
        </div>
      </div>
    </>
);


const PreviewSellerInfo: React.FC<any> = ({ customer, onClick }) => {

  return (
      <Container>
        {
          sections.map(section => previewSections(section, onClick))
        }
      </Container>
  );
};

export default PreviewSellerInfo;
