import React, { useContext, useState } from 'react';
import { Collapse, Card } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons/lib';
import { columns } from './tableData';
import { Link, NavLink } from 'react-router-dom';

import ThemeContext from '../../providers/themes/ThemeContext';
import {TableMobileSection} from './styles';



const { Panel } = Collapse;


const TableMobile = ({productList}: any) => {
    const [searchValue, setSearchValue] = useState('');
    const { themes } = useContext(ThemeContext);

    let searchProducts: any;


    if (searchValue === '') {
        searchProducts = productList;
    } else {
        searchProducts =
            productList.length &&
            productList.filter((product: any) => {
                const { productName } = product;
                if (productName.toLowerCase().includes(searchValue.toLowerCase())) {
                    return product;
                }
            });
    }
    return (
        <TableMobileSection {...themes}>
            <Card>
                <div className="head">
                    <span> Product Catalog </span>
                    <NavLink to="/dashboard/inventory/new" activeClassName="active" exact>
                        <PlusCircleOutlined />
                    </NavLink>
                </div>
                <Collapse expandIconPosition="right">
                    {
                        searchProducts.map((product: any) => {
                            const cols = [... columns];
                            cols.shift();
                            cols.pop();
                            return (
                                <Panel header={product.productName} key={product.key} extra={product.listing}>
                                    {cols.map(({title, dataIndex, key}: any)=>(
                                        <div key={dataIndex} className="details">
                                            <h4>{title}:</h4>
                                            <p>{product[key]}</p>
                                        </div>
                                    ))}
                                </Panel>
                            )
                        })
                    } 
                    
                </Collapse>
            </Card>
        </TableMobileSection>
    )
}

export default TableMobile;