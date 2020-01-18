import React from "react";
import {renderCardContent} from "components/card";
import TableSection from 'components/table'
import styled from "styled-components";
import details from "components/card/cardContent";

export const CardSection = styled.section`
 display: flex;
 justify-content: space-between;
 width: 97.09%;
`;

const ManageInventory = () => {

  return (
      <div>
      <CardSection>
        {details.map((detail: any, i: { toString: () => any; }) => (
            renderCardContent(detail, i.toString(), 340)
        ))}
      </CardSection>
      < TableSection/>
      </div>
  )
};

export default ManageInventory;

