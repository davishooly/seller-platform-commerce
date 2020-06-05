import React, { useContext, useState} from "react";
import {Link, NavLink} from 'react-router-dom'
import { Icon, Popconfirm, Select, Table, Input }  from 'antd';
import {Button, ButtonContainer, DivContainer, TableSection} from './styles';
import {columns} from "./tableData";
import Search from '../../components/Search'
import ThemeContext from "../../providers/themes/ThemeContext";
import {PlusCircleOutlined} from "@ant-design/icons/lib";
import {ProductPreview} from "./productPreview";

const { Option } = Select;
const options = ['category', 'price'];

const renderSearchInputs = (
    searchType: string,
    setFilterValue: Function,
    filterValue: any,
) => {

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFilterValue({ ...filterValue,  [name]: name === "category" ? value : Number(value)})

    };

    return searchType === "category" ?
        (
            <Input
                value={filterValue?.category}
                onChange={handleChange}
                name="category"
                style={{ width: 100, textAlign: 'center' }}
                placeholder="category"
            />

        )
        :
        (
            <>
                <Input.Group compact>
                    <Input
                        value={filterValue?.minPrice}
                        onChange={handleChange}
                        name="minPrice"
                        style={{ width: 100, textAlign: 'center' }}
                        placeholder="Minimum"
                        type="number"
                    />
                    <Input
                        className="site-input-split"

                        style={{
                            width: 30,
                            borderLeft: 0,
                            borderRight: 0,
                            pointerEvents: 'none',
                        }}
                        placeholder="~"
                        disabled
                    />
                    <Input
                        className="site-input-right"
                        name="maxPrice"
                        onChange={handleChange}
                        type="number"
                        style={{
                            width: 100,
                            textAlign: 'center',
                        }}
                        value={filterValue?.maxPrice}
                        placeholder="Maximum"
                    />
                </Input.Group>
            </>
        )

};


const RenderTable = ({
                         productList,
                         count,
                         isOpen,
                         setModalOpen,
                         filterValue,
                         selectedProduct,
                         setFilterValue,
                         confirm ,
                         refresh,
                         deletePending,
                         productFetchPending }
                         : any) => {

    const { themes } = useContext(ThemeContext);

    const [searchValue, setSearchValue] = useState('');

    const [searchType, setSearchType ] = useState('');


    const handleSearch = (value: any) => {
        setSearchValue(value.target.value)
    };

    const handleSelect = (value: string) => {
        setSearchType(value);
    };

    const products = selectedProduct.length;

    let searchProducts: any;


    if (searchValue === '') {
        searchProducts = productList
    } else {
        searchProducts = productList.length && productList.filter((product: any) => {
            const {productName} = product;
            if (productName.toLowerCase().includes(searchValue.toLowerCase())) {
                return product
            }
        })
    }

    return (
        <div>
            { ProductPreview(isOpen, setModalOpen) }
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
                            <Link  to={`/dashboard/inventory/edit/${selectedProduct.length && selectedProduct[0].id}`}>
                                <Button disabled={products !== 1} primary={products === 1 ? 'primary' : ''} className="verticalLine">Edit</Button>
                            </Link>
                            <Popconfirm
                                title="Are you sure delete this product?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button disabled={products < 1} delete={products > 0 ? 'delete' : ''}>Delete</Button>
                            </Popconfirm>
                        </ButtonContainer>
                        <div className="reload"  onClick={refresh}>
                            <Icon type="reload"/>
                            Refresh
                        </div>
                    </div>
                    <div className="filterSection">
                        <Select defaultValue="Filter products" onChange={handleSelect} style={{width: 140}}>
                            {options.map(value => (<Option key={value} value={`${value}`}>{value}</Option>))}
                        </Select>


                        {/* render search entry fields  */}
                        { searchType.length ?
                            renderSearchInputs(searchType, setFilterValue, filterValue)
                            : <Search handleSearch={handleSearch} searchValue={searchValue}/>
                        }

                    </div>
                </DivContainer>
                <Table loading={deletePending || productFetchPending} pagination={{total: count}} dataSource={searchProducts} columns={columns}/>
            </TableSection>
        </div>
    )
};
export default RenderTable;


