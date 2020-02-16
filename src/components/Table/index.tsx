import React, {useState, useCallback} from "react";
import {NavLink, Link} from 'react-router-dom'
import {Table, Select, Icon, Checkbox, Avatar, Switch, Popconfirm} from 'antd';
import {
    DivContainer, ListingContainer, TableSection, ProductContainer, Button, ButtonContainer
} from './styles';
import {columns} from "./tableData";
import Search from '../../components/Search'
import moment from "moment";
import {useMutation} from "redux-query-react";
import {deleteProduct} from "../../state/product";

const {Option} = Select;
const options = ['category', 'price'];


const RenderTable = ({products: {results, count}}: any) => {
    const [selectProduct, setSelectedProduct]: any = useState([]);

    const [searchValue, setSearchValue] = useState('');

    const [isVisible, setVisible] = useState(false);

    const [{isPending, isFinished}, deleteProducts] = useMutation((optimistic) => deleteProduct(selectProduct[0].id, optimistic))



    const onChange = (e: any) => {
        const {value, checked} = e.target;
        const products = Object.assign([], selectProduct);
        checked ?
            setSelectedProduct([...products, value])
            :
            setSelectedProduct(products.filter((product: any) => product.id !== value.id));
    };

    const handleSearch = (value: any) => {
        setSearchValue(value.target.value)
    }

    const handleDeleteProduct = useCallback(optimistic => {
        deleteProducts(optimistic).then(( response: any) => {
            if(response.status ===  204){
                setSelectedProduct([])
            }
        })
    }, [deleteProducts])


    const confirm = (e:any) => {
        e.preventDefault()
        handleDeleteProduct(e)
    }


    const renderListingContent = (checked: boolean, id: any) => (
        <ListingContainer>
            <Switch
                defaultChecked={checked}
                onChange={()=>{ console.log()}}
                checkedChildren="on"
                unCheckedChildren="off"
            />
            <Link to={`/dashboard/inventory/edit/${id}`}>
                <Icon type="edit"/>
            </Link>
            <Icon type="eye"/>
        </ListingContainer>
    );

    const renderProductContent = (data: any) => (
        <ProductContainer>
            <Checkbox value={data} onChange={onChange}/>
            <Avatar shape="square" size={44} icon="shopping"/>
            <span>{data.name} </span>
        </ProductContainer>
    );

    let productList = results.map(({product, purchasable, defaultPrice, availableUnits, salePrice}: any) => {
        if (product) {
            const {id, createdOn, name} = product;
            return {
                key: id,
                date: moment(createdOn).format('Do MMMM YYYY'),
                price: Number(defaultPrice),
                stock: availableUnits,
                status: purchasable ? "Live" : 'Unlisted',
                sale: Number(salePrice),
                productName: name,
                product: renderProductContent(product),
                listing: !purchasable
                    ? renderListingContent(false, id)
                    : renderListingContent(true, id)
            }
        }
    });

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

            <TableSection>
                <div className="head">
                    <span> Product Catalog </span>
                    <NavLink to="/dashboard/inventory/new" activeClassName="active" exact> Add products </NavLink>
                </div>
                <DivContainer>
                    <div className="filterSection">
                        <ButtonContainer>
                            <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Export</Button>
                            <Button primary={products > 0 ? 'primary' : ''} className="verticalLine">Unlist</Button>
                            <Link to={`/dashboard/inventory/edit/${selectProduct.length && selectProduct[0].id}`}>
                                <Button primary={products === 1 ? 'primary' : ''} className="verticalLine">Edit</Button>
                            </Link>
                            <Popconfirm
                                title="Are you sure delete this product?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button delete={products > 0 ? 'delete' : ''}>Delete</Button>
                            </Popconfirm>,
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
