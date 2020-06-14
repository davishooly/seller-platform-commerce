import React, { useContext } from 'react';
import Logo from 'icons/omaar-logo.svg';

import ThemeContext from 'providers/themes/ThemeContext';
import { StyledFooter, Span } from './styles';

const topCategories = ['Electronics', 'Category 1', 'Category 1', 'Category 1', 'Category 1'];
const earnUs = ['Sell on OE', 'Fulfilled by OE', 'Selling Terms & Policies', 'FAQs'];
const company = ['About', 'Other Businesses', 'Terms & Policies', 'Careers'];
const help = ['FAQs', 'Return Policy', 'Shipping & Delivery', 'Payments'];
const account = ['Sign In', 'Order Status', 'My Wishlist'];

const Footer = () => {
    const { themes } = useContext(ThemeContext);

    return (
        <StyledFooter {...themes}>
            <div className="container about">
                <div>
                    <Span> Top Categories </Span>
                    <div className="details">
                        {topCategories.map((category, i) => (
                            <p key={i.toString()}>{category}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <Span> Earn with Us </Span>
                    <div className="details">
                        {earnUs.map((earn, i) => (
                            <p key={i.toString()}>{earn}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <Span> My Account </Span>
                    <div className="details">
                        {account.map((account, i) => (
                            <p key={i.toString()}>{account}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <Span>Help </Span>
                    <div className="details">
                        {help.map((help, i) => (
                            <p key={i.toString()}>{help}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <Span> Company </Span>
                    <div className="details">
                        {company.map((company, i) => (
                            <p key={i.toString()}>{company}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container terms">
                <div className="privacy">
                    <span> Terms of Use </span>
                    <span> Privacy Notice </span>
                </div>
                <img src={Logo} alt="logo" style={{ filter: 'invert(0)', paddingBottom: 20 }} />
                <p>©2019 Omaar Marketplace. All Rights Reserved. </p>
            </div>
        </StyledFooter>
    );
};

export default Footer;
