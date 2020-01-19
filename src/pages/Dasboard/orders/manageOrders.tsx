import {Checkbox, Icon, Input, Select, Table} from "antd";
import React, {useState} from "react";
import { CardSection }  from '../inventory/manageInventory'
import {renderCardContent} from 'components/Card/index'
import Styled from 'styled-components';
import details from "./fixtures/details";
import {columns} from "./fixtures/tableColumns";
import dataSources from "./fixtures/dataSources";
import { Button, ButtonContainer, DivContainer, TableSection } from "components/Table/styles";


const OrderContainer  = Styled.div`
     display: flex;
     justify-content: space-between;
`;

const { Search } = Input;
const { Option } = Select;
const options = ['category', 'price'];

const ManageOrders = () => {

  const [selectedOrders, SelectOrders] = useState<any>([]);
  const onSelect = (e: any) => {
    const {value, checked} = e.target;
    const products = Object.assign([], selectedOrders);
    checked ?
        SelectOrders([...products, value])
        :
        SelectOrders(products.filter((product: any) => product.key !== value.key));
  };

  const renderOderContent = (data: any ) => (
      <OrderContainer>
        <Checkbox value={data} onChange={onSelect}/>
        <span>
          {data.order}
        </span>
      </OrderContainer>
  );

  const data = dataSources.map(data => {
    return {
      ...data, order: renderOderContent(data)
    }
  });

  const orders =  selectedOrders.length;

  return(
      <>
        <CardSection>
          {details.map((detail, i) => (
              renderCardContent(detail, i.toString(), 340)
          ))}
        </CardSection>

        <TableSection>
          <div className="head">
            <span> Orders </span>
          </div>
          <DivContainer order>
            <div className="filterSection filter__order">
              <ButtonContainer  order>
                <Button primary={orders > 0 ? 'primary' : ''} className="verticalLine">Export</Button>
                <Button primary={orders > 0 ? 'primary' : ''}>Fulfill</Button>
              </ButtonContainer>
              <div className="reload">
                <Icon type="reload"/>
                Refresh
              </div>
            </div>
            <div className="filterSection filter">
              <Select defaultValue="Filter Orders" style={{width: 140}}>
                {options.map(value => (<Option key={value} value={`${value}`}>{value}</Option>))}
              </Select>
              <Search
                  placeholder="Search orders"
                  onSearch={value => console.log(value)}
                  style={{width: 200}}
              />
            </div>
          </DivContainer>
          <Table columns={columns} dataSource={data}/>
        </TableSection>
      </>
  )
};

export default ManageOrders;
