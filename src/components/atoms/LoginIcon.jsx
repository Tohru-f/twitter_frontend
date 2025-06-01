import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: solid 1px #7F7F81;
  border-radius: 20px;
  width: 300px;
  height: 40px;
  color: #3BA3FF;
  text-align: center;
  background: black;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  &: hover {
  background-color: #1B1B1B;
`;

export const LoginIcon = ({ open }) => {
  return <Button onClick={open}>ログイン</Button>;
};
