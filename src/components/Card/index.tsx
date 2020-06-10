import React from "react";
import { Card } from 'antd'
import styled from "styled-components";

const Span = styled.span`
  font-size: 20px;
  color: white;
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    align-items: center;
`;

const RenderCard: React.FC<any> = ({style, children}) => {
  return (
      <Card bordered={true}
            style={{
                width: style.width,
                backgroundColor: style.color,
                borderRadius: 4,
                height: style.height || 185
              }}>
          {children}
      </Card>
      )
};

const renderCardContent = (content: any, index: any, width: any): JSX.Element => (
    <RenderCard style={{color: content.backgroundColor, width}} key={index}>
      <Span> {content.title} </Span>
      <Div>
        <span style={{paddingTop: 20, paddingBottom:12}}> {content.pending ? 'pending arrival' : ' in last in day' } </span>
        <span>{content.pending || content.day }</span>
      </Div>
      <Div>
        <p> {content.unlisted ? 'unlisted' : 'in last in week' }</p>
        <p>{content.unlisted || content.week }</p>
      </Div>
      <Div>
        <p>{content.live ? 'live' : 'in last in month' }</p>
        <p>{content.live || content.month }</p>
      </Div>
    </RenderCard>
);

export { RenderCard , renderCardContent }
