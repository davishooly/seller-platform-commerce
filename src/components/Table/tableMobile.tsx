import React, { useContext, useState } from 'react';
import { Collapse, Card, Empty, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons/lib';
import { Link, NavLink } from 'react-router-dom';
import Search from '../../components/Search';
import { options } from './tableData';

import ThemeContext from '../../providers/themes/ThemeContext';
import { TableMobileSection } from './styles';

import { renderSearchInputs } from '.';

const { Panel } = Collapse;
const { Option } = Select;

type setFilterValue = (value: any) => void;

const TableMobile = ({
    productList,
    title,
    columns,
    addProductIcon = false,
    hasSearch = false,
    hasFilter = false,
    filterValue = '',
    setFilterValue: setFilterValue,
}: any) => {
    const { themes } = useContext(ThemeContext);

    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('');

    const handleSelect = (value: string) => {
        setSearchType(value);
        setFilterValue({ minPrice: '', maxPrice: '', category: '', keywords: '' });
    };

    let searchProducts: any;

    // set the search value based on user input
    const handleSearch = (value: any) => {
        setSearchValue(value.target.value);
    };

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
                    <span> {title} </span>
                    {addProductIcon && (
                        <NavLink to="/dashboard/inventory/new" activeClassName="active" exact>
                            <PlusCircleOutlined />
                        </NavLink>
                    )}
                </div>
                <div className="filterSection">
                    {hasFilter && (
                        <Select
                            className="filter"
                            defaultValue="Filter products"
                            onChange={handleSelect}
                            style={{ width: 140 }}
                        >
                            {options.map((value) => (
                                <Option key={value} value={`${value}`}>
                                    {value}
                                </Option>
                            ))}
                        </Select>
                    )}

                    {/* render search entry fields  */}
                    {hasSearch &&
                        (searchType.length ? (
                            renderSearchInputs(searchType, setFilterValue, filterValue)
                        ) : (
                            <Search handleSearch={handleSearch} searchValue={searchValue} />
                        ))}
                </div>
                {productList.length ? (
                    <Collapse expandIconPosition="right">
                        {searchProducts.map((product: any) => {
                            return (
                                <Panel header={product.productName} key={product.key}>
                                    {columns.map(({ title, dataIndex, key }: any) => (
                                        <div key={dataIndex} className="details">
                                            <h4>{title}:</h4>
                                            <p>{product[key]}</p>
                                        </div>
                                    ))}
                                </Panel>
                            );
                        })}
                    </Collapse>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </Card>
        </TableMobileSection>
    );
};

export default TableMobile;
