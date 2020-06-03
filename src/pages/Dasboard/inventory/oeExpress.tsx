import React, {useContext, useState} from 'react';
import {
  Button,
  ButtonContainer,
  DivContainer,
  ListingContainer,
  ProductContainer,
  TableSection
} from "components/Table/styles";
import {Avatar, Checkbox, Icon, Select, Switch, Table} from "antd";
import Styled from 'styled-components';
import Search from 'components/Search'

import {columns} from "./expressFixture/tableData";
import dataSources from "./expressFixture/dataSources";
import ThemeContext from "../../../providers/themes/ThemeContext";

const { Option } = Select;
const options = ['category', 'price'];

const Span  =  Styled.span`
  color: #203341;
  font-size: 28px;
  line-height: 28px;
`;

const Div = Styled.div`
 .filterSection:first-of-type  {
   width: 38%;
 }`;

const OeExpress = () => {
  const [selectProduct, setSelectedProduct] = useState<any>([]);
    const { themes } = useContext(ThemeContext);


    const products = selectProduct.length;


  const onSelect = (e: any) => {
    const {value, checked} = e.target;
    const products = Object.assign([], selectProduct);
    checked ?
        setSelectedProduct([...products, value])
        :
        setSelectedProduct(products.filter((product: any) => product.key !== value.key));
  };


    const handleSearch = (value: string ) => {

        console.log({ value })

    }

  const renderOderContent = (data: any) => (
      <ProductContainer>
        <Checkbox value={data} onChange={onSelect}/>
        <Avatar shape="square" size={44} icon="shopping"/>
        <div>
        <span>{ data.product } </span>
        <div className="product__details">
          <span>SKU: LG2367</span>
        </div>
        </div>
      </ProductContainer>
  );

  const renderListingContent = (checked: any) => (
      <ListingContainer>
        <Switch
            defaultChecked={checked}
            onChange={()=>{ console.log()}}
            checkedChildren="on"
            unCheckedChildren="off"
        />
        <Icon type="eye"/>
      </ListingContainer>
  );

  const data = dataSources.map(data => {
    return {
      ...data, product: renderOderContent(data),
      listing: renderListingContent(true)
    }
  });

  return (
      <Div>
        <Span> Manage products fulfilled by OE </Span>
        <TableSection {...themes}>
          <div className="head">
            <span> Product Catalog </span>
          </div>
          <DivContainer>
            <div className="filterSection">
              <ButtonContainer express>
                <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Export</Button>
                <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Add Stock</Button>
                <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Request from Warehouse</Button>
              </ButtonContainer>
              <div className="reload">
                <Icon type="reload"/>
                Refresh
              </div>
            </div>
            <div className="filterSection">
              <Select defaultValue="Filter products" style={{width: 140}}>
                {options.map(value => (<Option key={value} value={`${value}`}>{value}</Option>))}
              </Select>
              <Search handleSearch={handleSearch} searchValue={''}/>
            </div>
          </DivContainer>
          <Table dataSource={[]} columns={columns}/>
        </TableSection>
      </Div>
  );
};

export default OeExpress;
