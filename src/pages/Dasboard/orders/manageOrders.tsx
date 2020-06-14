import { Checkbox, Icon, Input, Select, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { CardSection } from '../inventory/manageInventory';
import { renderCardContent } from 'components/Card/index';
import Styled from 'styled-components';
import details from './fixtures/details';
import { columns } from './fixtures/tableColumns';
import { Button, ButtonContainer, DivContainer, TableSection } from 'components/Table/styles';
import ThemeContext from '../../../providers/themes/ThemeContext';
import { useRequest } from 'redux-query-react';
import { getSellerProductsOrders } from '../../../state/orders';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader';

const OrderContainer = Styled.div`
      display: flex;
      justify-content: space-between;
`;

const { Search } = Input;
const { Option } = Select;
const options = ['category', 'price'];

const ManageOrders = () => {
    const [selectedOrders, SelectOrders] = useState<any>([]);
    const { themes } = useContext(ThemeContext);

    const [{ isFinished, isPending, status }, refresh] = useRequest(getSellerProductsOrders());

    const sellerOrders = useSelector((state: any) => state.entities.sellerOrders);

    if (!isFinished && status !== 200 && !sellerOrders) {
        return (
            <>
                <Loader />
            </>
        );
    }

    const onSelect = (e: any) => {
        const { value, checked } = e.target;
        const products = Object.assign([], selectedOrders);
        checked
            ? SelectOrders([...products, value])
            : SelectOrders(products.filter((product: any) => product.key !== value.key));
    };

    const renderOderContent = (data: any) => (
        <OrderContainer>
            <Checkbox value={data} onChange={onSelect} />
            <span>{data.order}</span>
        </OrderContainer>
    );

    const data =
        sellerOrders &&
        sellerOrders.results.map((data: any) => {
            return {
                ...data,
                order: renderOderContent(data),
            };
        });

    const orders = selectedOrders.length;

    return (
        <>
            <CardSection>{details.map((detail, i) => renderCardContent(detail, i.toString(), 340))}</CardSection>

            <TableSection {...themes}>
                <div className="head">
                    <span> Orders </span>
                </div>
                <DivContainer order>
                    <div className="filterSection filter__order">
                        <ButtonContainer order>
                            <Button primary={orders > 0 ? 'primary' : ''} className="verticalLine">
                                Export
                            </Button>
                            <Button primary={orders > 0 ? 'primary' : ''}>Fulfill</Button>
                        </ButtonContainer>
                        <div className="reload" onClick={refresh}>
                            <Icon type="reload" />
                            Refresh
                        </div>
                    </div>
                    <div className="filterSection filter">
                        <Select defaultValue="Filter Orders" style={{ width: 140 }}>
                            {options.map((value) => (
                                <Option key={value} value={`${value}`}>
                                    {value}
                                </Option>
                            ))}
                        </Select>
                        <Search
                            placeholder="Search orders"
                            onSearch={(value) => console.log(value)}
                            style={{ width: 200 }}
                        />
                    </div>
                </DivContainer>
                <Table loading={isPending} columns={columns} dataSource={data} />
            </TableSection>
        </>
    );
};

export default ManageOrders;
