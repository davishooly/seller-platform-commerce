import React, {useEffect, useState} from 'react';
import {withRouter, Link, useHistory} from "react-router-dom";
import { Icon, Button } from 'antd';
import { LoginContainer, ModelContent } from './styles'
import notification from '../../utils/toast'
import {loginSeller} from "../../state/auth/authQuery";
import {validate} from '../../utils/validators'
import { useDispatch  } from 'react-redux'
import { useMutation } from 'redux-query-react';
import { setStoreTokens } from "../../state/auth";


const user = {
    password: '',
    username: '',
    email: ''
};

const ModalContent = (props: any) => {
    const {onClick, modalIcon, signUpModal} = props;

    const {userCredentials, handleInputChange} = useInputChange();
    const [error, setInputError] = useState<any>({});
    const [isVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch();


    const {username, password, email} = userCredentials;
    const history = useHistory();

    const [{isFinished, isPending}, loginMutation] = useMutation((user: any) =>
        loginSeller({
            ...user
        })
    )


    useEffect(() => {
        if (password !== '') {
            setInputError({...error, password: ''})
        }

    }, [password]);

    useEffect(() => {
        if (email !== '') {
            setInputError({...error, email: ''})
        }

    }, [email]);

    useEffect(() => {
        if (username !== '') {
            setInputError({...error, username: ''})
        }
    }, [username]);

    const logInUser = (e: any) => {
        e.preventDefault();
        const infoFields = [
            {password},
            {email}
        ];
        const fieldErrors = validate(infoFields);
        setInputError({...error, ...fieldErrors});
        if (Object.keys(fieldErrors).length === 0) {
            loginMutation({email, password}).then(redirect).catch((error: any) => {
            })
        }
    };

    const redirect = (response: any) => {
        const {status, text, body: { expires_in , access_token, refresh_token }} = response;
        const { error , error_description } = JSON.parse(text);

        const now  =  new Date()

        if (status === 200 && !error ) {
            notification.success({
                message: "Success",
                description: "Welcome back to OE Seller Center"
            });
            localStorage.setItem("refreshToken", refresh_token);
            dispatch(setStoreTokens({
                accessToken:  access_token,
                refreshToken: refresh_token,
                expiresIn: now.getTime() + 20
            }))
            history.push("/dashboard")
        } else {
            notification.error({
                message: "Error",
                description: error_description
            });
        }
    };

    return (
        <ModelContent>
            {modalIcon ?
                <Icon onClick={onClick} type="close" style={{fontSize: 20, color: "#000000", cursor: "pointer"}}/> : ''}
            <LoginContainer>
                <div className="modal__container title">
                    <h1> OE Seller center </h1>
                </div>
                <form action="">
                    <div className="action__container">
                        {signUpModal ? (
                            <>
                                <input style={{borderColor: error.username ? "red" : ''}} required name='username'
                                       value={username} autoComplete="email" className="input__field"
                                       onChange={handleInputChange} placeholder="Username"/>
                                <span className="error" style={{color: "red"}}>{error.username}</span>
                            </>
                        ) : ''}
                        <input name='email' style={{borderColor: error.email ? "red" : ''}} autoComplete="phone"
                               value={email} className="input__field" onChange={handleInputChange}
                               placeholder="E-mail"/>
                        <span className="error" style={{color: "red"}}>{error.email}</span>
                        <div className="password__container">
                            <input
                                name='password'
                                style={{borderColor: error.password ? "red" : ''}}
                                autoComplete="new-password"
                                type={isVisible ? 'text' : 'password'}
                                value={password}
                                className="input__field"
                                onChange={handleInputChange}
                                placeholder="Password"/>
                            {signUpModal ? '' : <Icon onClick={() => setPasswordVisible(!isVisible)} type="eye"/>}
                        </div>
                        <span className="error" style={{color: "red"}}>{error.password}</span>
                        <Button className='btn' onClick={logInUser} loading={isPending}
                                style={{width: 223}}> Sign in </Button>
                        <div className="bottom__section">
                            <span>Can’t remember your password?</span>
                            <span> Recover it. </span>
                        </div>
                    </div>
                </form>
                <div className="bottom__section create">
                    <span> Don’t have an account?  </span>
                    <span id="sign up" onClick={onClick}>
                        <Link to={"/new"}> Create it </Link>
                    </span>
                </div>
            </LoginContainer>
        </ModelContent>
    );
};

export default withRouter(ModalContent);


const useInputChange = () => {
    const [userCredentials, setUserCredentials] = useState(user);

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setUserCredentials({...userCredentials, [name]: value});
    };
    return {
        userCredentials,
        handleInputChange
    }
};

