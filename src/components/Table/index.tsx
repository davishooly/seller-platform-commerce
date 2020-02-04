import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { Table, Select, Icon, Checkbox, Avatar, Switch } from 'antd';
import {
    DivContainer, ListingContainer, TableSection, ProductContainer, Button, ButtonContainer
} from './styles';
import { columns } from "./tableData";
import Search from '../../components/Search'
import moment from "moment";

const { Option } = Select;
const options = ['category', 'price'];


const  RenderTable = ({ products: { results, count } }: any ) => {
    const [selectProduct, setSelectedProduct]: any = useState([]);

    const onChange = (e: any) => {
        const {value, checked} = e.target;
        const products = Object.assign([], selectProduct);
        checked ?
            setSelectedProduct([...products, value])
            :
            setSelectedProduct(products.filter((product: any) => product.key !== value.key));
    };

    const renderListingContent = (checked: boolean) => (
        <ListingContainer>
            <Switch
                defaultChecked={checked}
                onChange={()=>{ console.log()}}
                checkedChildren="on"
                unCheckedChildren="off"
            />
            <Icon type="edit"/>
            <Icon type="eye"/>
        </ListingContainer>
    );

    const renderProductContent = (data: any) => (
        <ProductContainer>
            <Checkbox value={data} onChange={onChange}/>
            <Avatar shape="square" size={44} icon="shopping"/>
            <span>{ data.name } </span>
        </ProductContainer>
    );

    // const productList = data.sellerProducts.list.map((data: any) => {
    //     if(data){
    //         const { id, price, inventoryQuantity,createdAt, compareAtPrice }  = data.variants[0];
    //         return {
    //             key: id,
    //             date: moment(createdAt).format('Do MMMM YYYY'),
    //             price,
    //             stock: inventoryQuantity,
    //             status: !data.publishedAt ? "Live" :  'Unlisted',
    //             // description: data.description,
    //             sale: compareAtPrice,
    //             product: renderProductContent(data),
    //             listing: data.status === "Unlisted"
    //                 ? renderListingContent(false)
    //                 : renderListingContent(true)
    //         }
    //     }
    // });

    const products = selectProduct.length;
    return (
        <div>
            <TableSection>
                <div className="head">
                    <span> Product Catalog </span>
                    <NavLink to="/dashboard/inventory/new" activeClassName="active" exact> Add products  </NavLink>
                </div>
                <DivContainer>
                    <div className="filterSection">
                        <ButtonContainer>
                            <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Export</Button>
                            <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Unlist</Button>
                            <Button primary={products === 1 ? 'primary' : ''} className="verticalLine">Edit</Button>
                            <Button delete={products > 0 ? 'delete' : ''}>Delete</Button>
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
                        <Search/>
                    </div>
                </DivContainer>
                <Table pagination={{total: count}} dataSource={results} columns={columns}/>
            </TableSection>
        </div>
    )
};
export default RenderTable;
