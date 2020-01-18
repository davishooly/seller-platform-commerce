import styled from "styled-components"

const Menu = styled.ul`
	
	width: 100%;
	background-color: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 rgba(32,51,65,0.2), 0 1px 3px 0 rgba(0,0,0,0.05);
    color: #000;

    display: flex;
    list-style: none;

    align-items: center;
    padding: 20px 100px;


    a {
        color: #131A1E;
    }

    li {
        
        padding-right: 30px;
        font-size: 16px;
        line-height: 26px;
        padding-left: 0;
    }

    .active {
    color: #0065B0;
    border-bottom: 1px solid #0065B0;
    font-weight: bold;
    padding-bottom: 6px;
    }
`;

export default Menu
