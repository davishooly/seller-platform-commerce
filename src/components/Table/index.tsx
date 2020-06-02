import React, { useContext, useState} from "react";
import {Link, NavLink} from 'react-router-dom'
import { Icon, Popconfirm, Select, Table} from 'antd';
import {Button, ButtonContainer, DivContainer, TableSection} from './styles';
import {columns} from "./tableData";
import Search from '../../components/Search'
import ThemeContext from "../../providers/themes/ThemeContext";
import {PlusCircleOutlined} from "@ant-design/icons/lib";

const {Option} = Select;
const options = ['category', 'price'];


const RenderTable = ({products: {productList, count, selectProduct, confirm}}: any) => {

    const { themes } = useContext(ThemeContext);


    const [searchValue, setSearchValue] = useState('');

    const [isVisible, setVisible] = useState(false);


    const handleSearch = (value: any) => {
        setSearchValue(value.target.value)
    };

    const products = selectProduct.length;

    let searchProducts: any;


    if (searchValue === '') {
        searchProducts = productList
    } else {
        searchProducts = productList.filter((product: any) => {
            const {productName} = product;
            if (productName.toLowerCase().includes(searchValue.toLowerCase())) {
                return product
            }
        })
    }

    return (
        <div>

            <TableSection {...themes}>
                <div className="head">
                    <span> Product Catalog </span>
                    <NavLink to="/dashboard/inventory/new" activeClassName="active" exact>
                        <PlusCircleOutlined />
                        Add products
                    </NavLink>
                </div>
                <DivContainer>
                    <div className="filterSection">
                        <ButtonContainer>
                            <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Export</Button>
                            <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Unlist</Button>
                            <Link to={`/dashboard/inventory/edit/${selectProduct.length && selectProduct[0].id}`}>
                                <Button disabled={products === 1 ? false : true} primary={products === 1 ? 'primary' : ''} className="verticalLine">Edit</Button>
                            </Link>
                            <Popconfirm
                                title="Are you sure delete this product?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button disabled={products > 0 ? false : true} delete={products > 0 ? 'delete' : ''}>Delete</Button>
                            </Popconfirm>
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
                        <Search handleSearch={handleSearch} searchValue={searchValue}/>
                    </div>
                </DivContainer>
                <Table pagination={{total: count}} dataSource={searchProducts} columns={columns}/>
            </TableSection>
        </div>
    )
};
export default RenderTable;
