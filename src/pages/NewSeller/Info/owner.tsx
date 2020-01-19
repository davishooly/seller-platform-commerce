import React, { useEffect } from "react";
import styled from "styled-components";
import { Input } from "components";
import { Col, Row } from "antd";
import {validateEmail, validateNameFields} from "utils/validators";

const StyledInfo = styled.div`
  display: grid;

  place-content: center;
  padding: 3rem;

  .input {
  }

  .verify {
    background-color: #203341;
    border-radius: 4px;
    color: #fff;
    padding: 0;
    outline: none;
  }
`;

const Owner = ({ owner, changeCustomerDetails, setInputError, error }: any) => {
  const { username, email, firstname, lastname, password, confirmPassword } = owner;

  useEffect(() => {
    if (username !== "") {
      validateNameFields(
        username,
        "username",
        setInputError,
        error,
        "username"
      );
    }
  }, [username]);

  useEffect(() => {
    if (email !== "") {
      if(!validateEmail(email)){
        setInputError({...error, email: 'please enter a valid email address'})
      }
      else {
        setInputError({...error, email: ''})
      }
    }
  }, [email]);

  useEffect(() => {
    if (firstname !== "") {
      validateNameFields(
        firstname,
        "firstname",
        setInputError,
        error,
        "firstname"
      );
    }
  }, [firstname]);

  useEffect(() => {
    if (lastname !== "") {
      validateNameFields(
        lastname,
        "lastname",
        setInputError,
        error,
        "display name"
      );
    }
  }, [lastname]);

  useEffect(() => {
    if (password !== "") {
      validateNameFields(
        password,
        "password",
        setInputError,
        error,
        "business location"
      );
    }
  }, [password]);

  useEffect(()=>{
    if ( confirmPassword !== password) {
      setInputError({...error, confirmPassword:'confirm password does not match password' })
    }
    else {
      setInputError({...error, confirmPassword:'' })
    }

}, [confirmPassword]);

  return (
    <StyledInfo>
      <h1>Tell us about you</h1>
      <Input
        label="User details"
        placeholder="Username"
        style={{ borderColor: error.username ? "red" : "" }}
        tip="Whats your username"
        className="input"
        name="username"
        value={username}
        onChange={changeCustomerDetails}
      />
      <span style={{ color: "red" }}>{error.username}</span>

      <Input
        style={{ borderColor: error.email ? "red" : "" }}
        name="email"
        onChange={changeCustomerDetails}
        value={email}
        placeholder="example@mail.com"
      />
      <span style={{ color: "red" }}>{error.email}</span>

      <div className="input">
        <Row gutter={16}>
          <Col span={12}>
            <Input
              style={{ borderColor: error.firstname ? "red" : "" }}
              name="firstname"
              onChange={changeCustomerDetails}
              value={firstname}
              placeholder="firstname"
            />
            <span style={{ color: "red" }}>{error.firstname}</span>
          </Col>

          <Col span={12}>
            <Input
              style={{ borderColor: error.lastname ? "red" : "" }}
              name="lastname"
              onChange={changeCustomerDetails}
              value={lastname}
              placeholder="lastname"
            />
            <span style={{ color: "red" }}>{error.lastname}</span>
          </Col>
        </Row>
        <Input
          style={{ borderColor: error.password ? "red" : "" }}
          name="password"
          onChange={changeCustomerDetails}
          value={password}
          type="password"
          placeholder="password"
        />
        <span style={{ color: "red" }}>{error.password}</span>

        <Input
            style={{ borderColor: error.password ? "red" : "" }}
            name="confirmPassword"
            type="password"
            onChange={changeCustomerDetails}
            value={confirmPassword}
            placeholder="confirm password"
        />
        <span style={{ color: "red" }}>{error.confirmPassword}</span>

      </div>
    </StyledInfo>
  );
};

export default Owner;
