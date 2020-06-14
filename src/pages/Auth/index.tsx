import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContent from './loginContent';
import Footer from 'components/Layout/Footer/index';
import { ReactComponent as Logo } from 'icons/omaar-logo.svg';

import { HeaderContainer, Container, RegisterContainer } from './styles';
import ThemeContext from '../../providers/themes/ThemeContext';

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

    return (
        <>
            <AuthHeader themes={themes} />
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
