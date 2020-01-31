import React, {useEffect, useState} from 'react';
import {withRouter, Link, useHistory } from "react-router-dom";
import { Icon, Button } from 'antd';
import jwt_decode from 'jwt-decode';
import Logo from 'icons/omaar-logo.svg'
import { LoginContainer, ModelContent } from './styles'
import notification from '../../utils/toast'
import { loginSeller } from "../../state/auth/authQuery";
import { validate } from '../../utils/validators'
import { useMutation } from 'redux-query-react';



const user = {
    password: '',
    username: '',
    email: ''
};

const ModalContent = (props: any) => {
    const {onClick, modalIcon, signUpModal} = props;

    const {userCredentials, handleInputChange} = useInputChange();
    const [error, setInputError] = useState<any>({});

    const {username, password, email} = userCredentials;
    const history = useHistory();

      const [ { isFinished, isPending}, loginMutation ] = useMutation( (user: any) =>
          loginSeller({
              email: user.username, password: user.password
          })
      )


    useEffect(() => {
        if (password !== '') {
            setInputError({...error, password: ''})
        }

    }, [password]);

    useEffect(() => {
        if (username !== '') {
            setInputError({...error, username: ''})
        }
    }, [username]);

    const logInUser = (e: any) => {
        e.preventDefault();
        const infoFields = [
            {username},
            {password},
        ];
        const fieldErrors = validate(infoFields);
        setInputError({...error, ...fieldErrors});
        if (Object.keys(fieldErrors).length === 0) {
            loginMutation( {username, password }).then(redirect).catch((error: any) => {
                console.log(error)
            })
        }
    };

    const redirect = (response: any) => {
        const { status, text }  = response;
        if( status === 201){
            notification.success({
                message: "Success",
                description: "Welcome back "
            });
            history.push("/dashboard")
        }
        else {
            // const { owner: { email } } = JSON.parse(text)
            console.log(">>>>>>", JSON.parse(text))
            notification.error({
                message: "Error",
                description: ""
            });
        }
    };

    return (
        <ModelContent>
            {modalIcon ?
                <Icon onClick={onClick} type="close" style={{fontSize: 20, color: "#000000", cursor: "pointer"}}/> : ''}
            <LoginContainer>
                <div className="image">
                    <img src={Logo} alt='logo' style={{filter: "invert(1)"}}/>
                </div>
                <form action="">
                    <div className="action__container">
                        <input style={{borderColor: error.username ? "red" : ''}} required name='username'
                               value={username} autoComplete="email" className="input__field"
                               onChange={handleInputChange} placeholder={"Username"}/>
                        <span style={{color: "red"}}>{error.username}</span>
                        <span style={{color: "red"}}>{error.email}</span>
                        <input name='password' style={{borderColor: error.password ? "red" : ''}}
                               autoComplete="new-password" type='password' value={password} className="input__field"
                               onChange={handleInputChange} placeholder="Password"/>
                        <span style={{color: "red"}}>{error.password}</span>
                        <Button className='btn' onClick={logInUser} loading={ isPending }
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