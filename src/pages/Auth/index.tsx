import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContent from './loginContent';
import Footer from 'components/Layout/Footer/index';
import { ReactComponent as Logo } from 'icons/omaar-logo.svg';

import { HeaderContainer, Container, RegisterContainer } from './styles';
import ThemeContext from '../../providers/themes/ThemeContext';
import { useWindowSize } from 'react-use';
import { Hamburger } from '../../components/Menu/hamburger';
import { menuItems } from '../../components/Layout';

export const AuthHeader = ({ reset, themes }: any) => (
    <HeaderContainer {...themes}>
        <div className="container">
            <div className="navbar-header">
                <Logo />
                {reset && (
                    <div className="navigation">
                        <span>
                            <Link to={'/login'}> Sign in </Link>
                        </span>
                        <span>
                            <Link to={'/new'}>Create account</Link>
                        </span>
                    </div>
                )}
            </div>
        </div>
    </HeaderContainer>
);

const Register = () => {
    const { themes } = useContext(ThemeContext);
    const { width } = useWindowSize();

    return (
        <>
            {width > 768 ? <AuthHeader themes={themes} /> : <Hamburger menuItems={menuItems} />}
            <RegisterContainer>
                <div className="modal__container">
                    <Container>
                        <LoginContent />
                    </Container>
                </div>
            </RegisterContainer>
            <Footer />
        </>
    );
};
export default Register;
