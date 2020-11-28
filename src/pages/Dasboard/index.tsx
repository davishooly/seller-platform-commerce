import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Menu from './menu';
import { Avatar, Icon, Table } from 'antd';
import { Link } from 'react-router-dom';
import { columns } from './dashboardFixtures/tableColumns';
import dataSources from './dashboardFixtures/dataSources';
import Container from '../../components/Common/Container';
import { useRequests } from 'redux-query-react';

import { ProductContainer, TableSection } from '../../components/Table/styles';
import TableMobile from 'components/Table/tableMobile';
import { CardSection } from './inventory/manageInventory';
import { details, orderSummary, fullFilledSummary } from './dashboardFixtures/details';
import { RenderCard } from 'components/Card';
import Loader from 'components/Loader';
import { AnalyticsSection, Span, Div, DivCard } from './styles';
import { BarChart } from 'components/Charts';
import ThemeContext from '../../providers/themes/ThemeContext';
import { bestSellingProducts, getPendingOrders } from '../../state/dashboard';
import useBeforeUnload from 'use-before-unload/lib';
import { QueryConfig } from 'redux-query';
import { useWindowSize } from 'react-use';

// handle dashboard api calls
const request: Array<QueryConfig> = [getPendingOrders()];

//TODO Pending orders

const Dashboard: React.FC<any> = () => {
    const [{ isFinished, isPending, status }, refresh] = useRequests(request);

    const { width } = useWindowSize();

    const bestSellerProducts = useSelector((state: any) => state.entities?.bestSellerProducts);
    const pendingOrders = useSelector((state: any) => state.entities?.pendingOrders);

    const { themes } = useContext(ThemeContext);
    const sellerInfo = useSelector((state: any) => state.entities);

    const renderProductContent = (data: any, index: number) => (
        <ProductContainer key={index.toString()}>
            <Avatar shape="square" size={44} icon="shopping" />
            <div>
                <span>LG SK8Y Sound bar system for home theater</span>
                <div className="product__details">
                    <span>SKU: LG2367</span>
                    <span> Price: 51,423.56 </span>
                </div>
            </div>
        </ProductContainer>
    );

    const data = dataSources.map((data, index) => {
        return {
            ...data,
            product: renderProductContent(data, index),
        };
    });

    useBeforeUnload(() => {
        /* Do some checks here if you like */
        return true; // Suppress reload
    });

    return (
        <>
            <Menu>
                <li className="welcome">
                    Hey {sellerInfo.seller ? sellerInfo.seller.name : ''}!.Its great to see you again.
                </li>
            </Menu>
            {!isFinished && status !== 200 && !bestSellerProducts ? (
                <Loader />
            ) : (
                <Container>
                    <AnalyticsSection>
                        <RenderCard style={{ color: '#28A197', width: 282, height: 479 }}>
                            <Span>Your Orders </Span>
                            <div className="summary">
                                {orderSummary.map((summary, index) => (
                                    <div className="summary__section" key={index.toString()}>
                                        <span> {summary.status}</span>
                                        <span> {summary.amount} </span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {fullFilledSummary.map((summary, index) => (
                                    <div className="fulfilled" key={index.toString()}>
                                        <Span>
                                            {' '}
                                            {summary.fullFilled === 'seller' ? 'Seller fulfilled' : 'Fulfilled by OE'}
                                        </Span>
                                        <Div>
                                            <span style={{ paddingTop: 4, paddingBottom: 4 }}> in last day </span>
                                            <span>{summary.day}</span>
                                        </Div>
                                        <Div>
                                            <span style={{ paddingTop: 4, paddingBottom: 4 }}> in last 7 days </span>
                                            <span>{summary.week}</span>
                                        </Div>
                                    </div>
                                ))}
                                <div className="link__orders">
                                    <Link to="/d/orders">
                                        <Span> View your orders </Span>
                                    </Link>
                                </div>
                            </div>
                        </RenderCard>
                        <RenderCard style={{ color: '#FFFFFF', width: 510, height: 479 }}>
                            <Span style={{ color: '#203341' }}>Sales Summary </Span>
                            <BarChart />
                        </RenderCard>
                        <div className="payments">
                            <RenderCard style={{ color: '#7073AF', width: 354, height: 277 }}>
                                <Span> Payment Summary </Span>
                                <div className="payments__summary">
                                    <div>
                                        <Div>
                                            <span style={{ paddingTop: 4, paddingBottom: 4 }}>
                                                {' '}
                                                Most recent payment{' '}
                                            </span>
                                            <span> KES 0 </span>
                                        </Div>
                                        <p>Disbursed to your bank account ending in 8970 on August 10, 2019</p>
                                    </div>

                                    <Div>
                                        <span style={{ paddingTop: 4, paddingBottom: 4 }}> Balance </span>
                                        <span> KES 0 </span>
                                    </Div>
                                </div>
                                <div className="link__orders">
                                    <Span> View Payment Summary </Span>
                                </div>
                            </RenderCard>

                            <RenderCard style={{ color: '#DB6E9B', width: 354, height: 182 }}>
                                <Span> Manage Disputes </Span>
                                <div className="disputes">
                                    <Div>
                                        <span style={{ paddingTop: 4, paddingBottom: 4 }}> pending </span>
                                        <span> 0 </span>
                                    </Div>
                                    <Div>
                                        <span style={{ paddingTop: 4, paddingBottom: 4 }}> resolve </span>
                                        <span> 0 </span>
                                    </Div>
                                </div>
                                <div className="link__orders">
                                    <Span> View your dispute logs </Span>
                                </div>
                            </RenderCard>
                        </div>
                    </AnalyticsSection>

                    <CardSection>
                        {details.map((detail, i) => (
                            <RenderCard
                                key={i.toString()}
                                style={{
                                    color: detail.backgroundColor,
                                    width: 282,
                                    height: 'auto',
                                }}
                            >
                                <Span> {detail.title} </Span>
                                {detail.percentage ? (
                                    <DivCard>
                                        <span style={{ paddingTop: 4, paddingBottom: 4 }}> {detail.percentage} </span>
                                        <span> increase{detail.increase}% </span>
                                    </DivCard>
                                ) : (
                                    <div>
                                        <Div>
                                            <span style={{ paddingTop: 4, paddingBottom: 4 }}> Cancellation rate </span>
                                            <span> {detail.increase} </span>
                                        </Div>
                                        <Div>
                                            <span style={{ paddingTop: 4, paddingBottom: 4 }}>
                                                {' '}
                                                Created in Last 14 days{' '}
                                            </span>
                                            <span> {detail.created} </span>
                                        </Div>
                                    </div>
                                )}
                            </RenderCard>
                        ))}
                    </CardSection>

                    {width > 768 ? (
                        <TableSection {...themes}>
                            <div className="head">
                                <span> Best Selling Products </span>
                                <div className="reload" onClick={refresh}>
                                    <Icon type="reload" />
                                    Refresh
                                </div>
                            </div>
                            <Table
                                loading={isPending}
                                columns={columns}
                                dataSource={bestSellerProducts && bestSellerProducts.results}
                            />
                        </TableSection>
                    ) : (
                        <TableMobile
                            {...{ productList: bestSellerProducts.results, title: 'Best Selling Products', columns }}
                        />
                    )}
                </Container>
            )}
        </>
    );
};

export default Dashboard;
