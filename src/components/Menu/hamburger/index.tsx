import React, {useContext, useState} from "react";
import { useHistory  } from "react-router-dom";
import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons/lib";

import { ReactComponent as Logo} from "icons/omaar-logo.svg";

import {HamburgerContainer} from "./styles";
import ThemeContext from "providers/themes/ThemeContext";


interface Menu {
    path: string,
    name: string,
}


export const Hamburger = (menuItems: Array<Menu>) => {

    const [isMenuOpen, toggleMenu ] = useState( false );

    const { themes } = useContext(ThemeContext);

    const history = useHistory();

    const toggleMenus = (e: any) => {
        e.preventDefault();
        toggleMenu(!isMenuOpen);
    };


    const handleMenuNavigation = (path: string) => {
        toggleMenu(false);
        history.push(path);
    };

    // render menu items
    const renderMenuItems = () => (
        <>
            {
                menuItems.map(({ path, name}: Menu) => (
                    <div onClick={() => handleMenuNavigation(path)}>
                        <span>{ name }</span>
                    </div>

                ))
            }

        </>
    );

    return (
        <HamburgerContainer {...{themes, isMenuOpen}} >
            <div className={"top__section"}>
            <div className="toggle__container">
                <div className="brand__section">
                    <Logo />
                    <span> Omar Marketplace</span>
                </div>
                {
                    isMenuOpen ?
                        <CloseOutlined onClick={toggleMenus} />
                        :
                        <MenuUnfoldOutlined onClick={toggleMenus}/>

                }
            </div>
            </div>
            <div className="menu__items--section">
                { isMenuOpen && renderMenuItems()}
            </div>

        </HamburgerContainer>
    );

};

