import React, {useCallback, useState} from "react";
import {renderCardContent} from "components/Card";
import TableSection from 'components/Table'
import styled from "styled-components";
import details from "components/Card/cardContent";
import {useMutation, useRequest} from "redux-query-react";
import {useSelector} from "react-redux";
import { getSellerProducts } from '../../../state/seller';
import moment from "moment";
import {ListingContainer, ProductContainer} from "../../../components/Table/styles";
import {Avatar, Checkbox, Icon, notification, Switch, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {deleteProductVariant} from "../../../state/product";
import Loader from "components/Loader";


export const CardSection = styled.section`
 display: flex;
 justify-content: space-between;
 width: 97.09%;
`;

const filter = { minPrice: "", maxPrice: "", category: '', keywords: ''};


const ManageInventory = () => {

    const [filterValue, setFilterValue]= useState(filter);

    const [isOpen, setModalOpen] = useState(false);

    const sellerProducts = useSelector((state: any) => state.entities.sellerProducts);

    const [{isFinished, isPending: productFetchPending, status}, refresh] = useRequest(getSellerProducts({
        ...filterValue
    }));

    const [selectedProduct, setSelectedProduct]: any = useState([]);

    const [{ isPending: deletePending}, deleteProducts] = useMutation((optimistic) => deleteProductVariant(selectedProduct[0], optimistic));

    const handleDeleteProduct = useCallback(optimistic => {
        deleteProducts(optimistic).then(( response: any) => {
            if(response.status ===  204){
                notification.success({
                    message: "Success",
                    description: "Your Product has been deleted successfully"
                });
                setSelectedProduct([])
            }
        })
    }, [deleteProducts]);

    if (!isFinished && status !== 200 && !sellerProducts) {
        return (
            <>
                <Loader />
            </>
        )
    }

    let productList: Array<any> = [];

    const confirm = (e:any) => {
        e.preventDefault();
        handleDeleteProduct(e)
    };


    const onChange = (e: any) => {
        const {value, checked} = e.target;
        const products = Object.assign([], selectedProduct);
        checked ?
            setSelectedProduct([...products, value])
            :
            setSelectedProduct(products.filter((product: any) => product.id !== value.id));
    };


    const renderListingContent = (checked: boolean, id: any) => (
        <ListingContainer>
            <Tooltip title="set product visible">
            <Switch
                defaultChecked={checked}
                onChange={()=>{ console.log()}}
                checkedChildren="on"
                unCheckedChildren="off"
            />
            </Tooltip>
            <Tooltip title="edit product">
            <Link to={`/dashboard/inventory/edit/${id}`}>
                <Icon type="edit"/>
            </Link>
            </Tooltip>

            <Tooltip title="view product">
            <Icon type="eye" onClick={() => setModalOpen(!isOpen)}/>
            </Tooltip>

        </ListingContainer>
    );

    const renderProductContent = (product: any) => (
        <ProductContainer>
            <Tooltip title="select product">
            <Checkbox value={product} onChange={onChange}/>
            </Tooltip>
            <Avatar shape="square" size={44} icon="shopping"/>
            <span>{product.name} </span>
        </ProductContainer>
    );

    sellerProducts && sellerProducts.results.forEach(({ product }: any) => {
        if (product) {
            const {id, createdOn, name, variationVariables} = product;

            variationVariables.forEach((variable: any) => {
                const {values, pk} = variable;

                values.forEach((value: any) => {
                    const {sale_price, sku, available_units, minimum_price} = value;
                    productList.push({
                        key: pk,
                        date: moment(createdOn).format('Do MMMM YYYY'),
                        price: Number(sale_price),
                        stock: available_units,
                        status: !product.deleted ? "Live" : 'Unlisted',
                        sale: Number(minimum_price),
                        productName: name,
                        product: renderProductContent({
                            variations: variationVariables.length, productId: id, name, variantId:pk
                        }),
                        listing: !product.deleted
                            ? renderListingContent(false, pk)
                            : renderListingContent(true, pk)
                    })
                })
            });
        }
    });

    return (
        <div>
            <CardSection>
                {details.map((detail: any, i: { toString: () => any; }) => (
                    renderCardContent(detail, i.toString(), 340)
                ))}
            </CardSection>
            < TableSection { ...{productList,
                productFetchPending,
                deletePending,
                setFilterValue,
                filterValue,
                refresh,
                isOpen,
                setModalOpen,
                count: sellerProducts && sellerProducts.count,
                selectedProduct,
                confirm
            }}
            />
        </div>
    )
};

export default ManageInventory;

