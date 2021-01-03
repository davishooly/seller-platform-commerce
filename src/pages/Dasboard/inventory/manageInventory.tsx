import React, { useCallback, useState, useMemo } from 'react';
import { renderCardContent } from 'components/Card';
import TableSection from 'components/Table';
import TableMobile from 'components/Table/tableMobile';
import styled from 'styled-components';
import details from 'components/Card/cardContent';
import { useMutation, useRequest } from 'redux-query-react';
import { useSelector } from 'react-redux';
import { getSellerProducts } from 'state/seller';
import moment from 'moment';
import { ListingContainer, ProductContainer } from 'components/Table/styles';
import { Avatar, Checkbox, Icon, notification, Switch, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { deleteProductVariant } from 'state/product';
import Loader from 'components/Loader';
import { useWindowSize } from 'react-use';
import { mobileColumn } from 'components/Table/tableData';
import { device } from 'mediaScreen/mediaQueries';

export const CardSection = styled.section`
    display: flex;
    justify-content: space-between;
    width: 97.09%;

    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
        width: 100%;
        flex-direction: column;
        .ant-card {
            margin-bottom: 20px;
            width: 100% !important;
        }
    }
`;

const filter = { minPrice: '', maxPrice: '', category: '', keywords: '' };

const ManageInventory = () => {
    const [filterValue, setFilterValue] = useState(filter);

    const { width } = useWindowSize();

    const [isOpen, setModalOpen] = useState(false);

    const sellerProducts = useSelector((state: any) => state.entities.sellerProducts);

    const [{ isFinished, isPending: productFetchPending, status }, refresh] = useRequest(
        getSellerProducts({
            ...filterValue,
        }),
    );

    useMemo(() => refresh(), []).then();

    const [selectedProduct, setSelectedProduct]: any = useState([]);

    const [{ isPending: deletePending }, deleteProducts] = useMutation((optimistic) =>
        deleteProductVariant(selectedProduct[0], optimistic),
    );

    const handleDeleteProduct = useCallback(
        (optimistic) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            deleteProducts(optimistic).then((response: any) => {
                if (response.status === 204) {
                    refresh().then(() => ({}));
                    notification.success({
                        message: 'Success',
                        description: 'Your Product has been deleted successfully',
                    });
                    setSelectedProduct([]);
                }
            });
        },
        [deleteProducts],
    );

    if (!isFinished && status !== 200 && !sellerProducts) {
        return (
            <>
                <Loader />
            </>
        );
    }
    const productList: Array<any> = [];

    const confirm = (e: any) => {
        e.preventDefault();
        handleDeleteProduct(e);
    };

    const onChange = (e: any) => {
        const { value, checked } = e.target;
        const products = Object.assign([], selectedProduct);
        checked
            ? setSelectedProduct([...products, value])
            : setSelectedProduct(products.filter((product: any) => product.id !== value.id));
    };

    const renderListingContent = (checked: boolean, id: any) => (
        <ListingContainer>
            <Tooltip title="set product visible">
                <Switch
                    defaultChecked={checked}
                    onChange={() => {
                        console.log();
                    }}
                    checkedChildren="on"
                    unCheckedChildren="off"
                />
            </Tooltip>
            <Tooltip title="edit product">
                <Link to={`/dashboard/inventory/edit/${id}`}>
                    <Icon type="edit" />
                </Link>
            </Tooltip>

            <Tooltip title="view product">
                <Icon type="eye" onClick={() => setModalOpen(!isOpen)} />
            </Tooltip>
        </ListingContainer>
    );

    const renderProductContent = (product: any) => (
        <ProductContainer>
            <Tooltip title="select product">
                <Checkbox value={product} onChange={onChange} />
            </Tooltip>
            <Avatar shape="square" size={44} icon="shopping" />
            <span>{product.name} </span>
        </ProductContainer>
    );

    sellerProducts &&
        sellerProducts.results.forEach(({ product, id: ProductId, basePrice }: any) => {
            if (product) {
                const { createdOn, name, variationVariables } = product;

                variationVariables.forEach((variable: any) => {
                    const { values } = variable;
                    values.forEach((value: any) => {
                        const { salePrice, sku, value: type, availableUnits, id } = value;
                        productList.push({
                            key: id,
                            date: moment(createdOn).format('Do MMMM YYYY'),
                            variant: type,
                            price: Number(basePrice || ''),
                            stock: availableUnits,
                            sku: sku,
                            status: !product.deleted ? 'Live' : 'Unlisted',
                            sale: Number(salePrice || ''),
                            productName: name,
                            product: renderProductContent({
                                variations: values.length || 0,
                                productId: ProductId,
                                name,
                                variantId: id,
                            }),
                            listing: !product.deleted
                                ? renderListingContent(false, id)
                                : renderListingContent(true, id),
                        });
                    });
                });
            }
        });

    return (
        <div>
            <CardSection>
                {details.map((detail: any, i: { toString: () => any }) => renderCardContent(detail, i.toString(), 340))}
            </CardSection>

            {width > 768 ? (
                <TableSection
                    {...{
                        productList,
                        productFetchPending,
                        deletePending,
                        setFilterValue,
                        filterValue,
                        refresh,
                        isOpen,
                        setModalOpen,
                        count: sellerProducts && sellerProducts.count,
                        selectedProduct,
                        confirm,
                    }}
                />
            ) : (
                <TableMobile
                    {...{
                        productList,
                        title: 'Product Catalog',
                        columns: mobileColumn,
                        addProductIcon: true,
                        hasSearch: true,
                        hasFilter: true,
                        filterValue,
                        setFilterValue,
                    }}
                />
            )}
        </div>
    );
};

export default ManageInventory;
