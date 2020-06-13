import React, { useEffect, useState, useContext } from 'react';
import { Input, Select, Icon } from 'antd';
import { Link } from 'react-router-dom';

import PopConfirm from 'components/Pop';
import { Button, StyledHeader, PopContainer, SignUpSpan } from './styles';
import Logo from 'icons/omaar-logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { removeTokens } from '../../../state/auth';
import ThemeContext from '../../../providers/themes/ThemeContext';

const NavLink = (props: any) => (
    <Link
        getProps={({ isPartiallyCurrent }: any) => ({
            className: isPartiallyCurrent ? 'nav-link active' : 'nav-link',
        })}
        {...props}
    />
);

const { Option } = Select;
const { Search } = Input;

const selectBefore = (
    <Select defaultValue="All" style={{ width: 90 }}>
        <Option value="All">All</Option>
        <Option value="Fashion"> Fashion </Option>
    </Select>
);

export const useCustomModalChange = () => {
    const [isOpen, setOpenPop] = useState(false);
    const [modalState, openModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(true);

    const handleModalChange = (e: any) => {
        const { name, id } = e.target;
        openModal(!modalState);
        if (name === 'sign in') {
            setOpenPop(!isOpen);
            setSignUpModal(false);
        } else if (id === 'sign up') {
            setOpenPop(false);
            openModal(true);
            setSignUpModal(!signUpModal);
        }
    };

    return {
        isOpen,
        setOpenPop,
        modalState,
        openModal,
        signUpModal,
        setSignUpModal,
        handleModalChange,
    };
};

const useCustomUserCheck = () => {
    const [username, setIsLoggedIn] = useState('');
    const sellerInfo = useSelector((state: any) => state.entities);

    useEffect(() => {
        if (sellerInfo && sellerInfo.seller) {
            setIsLoggedIn(sellerInfo.seller.name);
        }
    });

    return {
        username,
        setIsLoggedIn,
    };
};

const Header = () => {
    const { isOpen, setOpenPop } = useCustomModalChange();
    const { themes } = useContext(ThemeContext);
    const { username } = useCustomUserCheck();
    const openPopConfirm = () => {
        setOpenPop(!isOpen);
    };
    return (
        <StyledHeader {...themes}>
            <div className="header">
                <img src={Logo} alt="logo" style={{ filter: 'invert(0)', paddingBottom: 20 }} />

                <ul>
                    <li>
                        <div style={{ marginBottom: 16, marginRight: 30 }}>
                            <Search
                                addonBefore={selectBefore}
                                enterButton={<Icon type="search" />}
                                size="large"
                                defaultValue=""
                                style={{ width: 500, height: 40 }}
                                placeholder="Search"
                            />
                        </div>
                    </li>
                    <div className="pop__container">
                        <li className="account" onClick={openPopConfirm}>
                            <Icon type="user" />
                            {username ? username : ' Account'}{' '}
                        </li>
                        {username ? (
                            ''
                        ) : (
                            <PopConfirm isOpen={isOpen} setOpenPop={setOpenPop}>
                                <PopContainer>
                                    <span> Returning customer? </span>
                                    <Button {...themes} name="sign in" onClick={openPopConfirm}>
                                        <Link to="/login"> Sign in</Link>
                                    </Button>
                                    <span> {"Don't have an account?"}</span>
                                    <SignUpSpan {...themes} id="sign up" onClick={openPopConfirm}>
                                        <Link to="/new"> Sign up</Link>
                                    </SignUpSpan>
                                </PopContainer>
                            </PopConfirm>
                        )}
                    </div>
                </ul>
            </div>

            <div className="footer">
                <ul>
                    <li> All Categories</li>
                    <li> Top Seller</li>
                    <li> {"Today's Deals"}</li>
                    <li> OE Fashion</li>
                    <li> OE Market</li>
                    <li> Customer Service</li>
                    <li> Global Shopping</li>
                </ul>

                <ul>
                    {username ? (
                        <li>
                            <Link to="/new"> Start Selling </Link>
                        </li>
                    ) : (
                        ''
                    )}
                    <li> Blog</li>
                </ul>
            </div>
        </StyledHeader>
    );
};

export const DashboardHeader = () => {
    const { username } = useCustomUserCheck();
    const dispatch = useDispatch();
    const { themes } = useContext(ThemeContext);
    const { isOpen, setOpenPop } = useCustomModalChange();

    const openPopConfirm = () => {
        setOpenPop(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(removeTokens());
        setOpenPop(!isOpen);
        window.location.reload();
    };

    return (
        <StyledHeader {...themes}>
            <div className="header">
                <img src={Logo} alt="logo" style={{ filter: 'invert(0)', paddingBottom: 20 }} />
                <ul>
                    <div className="pop__container">
                        <li className="account" onClick={openPopConfirm}>
                            <Icon type="user" /> {username}{' '}
                        </li>
                        {username ? (
                            <PopConfirm logout isOpen={isOpen} setOpenPop={setOpenPop}>
                                <PopContainer logout>
                                    <div className="pop__content">
                                        <span>
                                            <NavLink to="/dashboard/orders" activeClassName="active">
                                                {' '}
                                                Orders{' '}
                                            </NavLink>
                                        </span>
                                        <span>
                                            <NavLink to="/dashboard/payout" activeClassName="active">
                                                {' '}
                                                Payouts{' '}
                                            </NavLink>
                                        </span>
                                        <span>
                                            <NavLink to="/dashboard/settings" activeClassName="active">
                                                {' '}
                                                Profile{' '}
                                            </NavLink>
                                        </span>
                                        <Button {...themes} name="log out" onClick={handleLogout}>
                                            {' '}
                                            Logout{' '}
                                        </Button>
                                    </div>
                                </PopContainer>
                            </PopConfirm>
                        ) : (
                            ''
                        )}
                    </div>
                </ul>
            </div>

            <div className="footer">
                <ul>
                    <li>
                        <NavLink to="/dashboard" activeClassName="active" exact>
                            {' '}
                            Dashboard{' '}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/inventory" activeClassName="active">
                            {' '}
                            Inventory{' '}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/orders" activeClassName="active">
                            {' '}
                            Orders{' '}
                        </NavLink>
                    </li>
                    <li> Advertising</li>
                    <li> Reports</li>
                    <li>
                        <NavLink to="/dashboard/payout" activeClassName="active">
                            {' '}
                            Payouts{' '}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/settings" activeClassName="active">
                            {' '}
                            Settings{' '}
                        </NavLink>
                    </li>
                </ul>

                <ul>
                    <li> Help & FAQs </li>
                    <li> View Shop</li>
                </ul>
            </div>
        </StyledHeader>
    );
};

export default Header;
