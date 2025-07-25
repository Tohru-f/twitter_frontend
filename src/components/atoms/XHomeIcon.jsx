import React from "react";
import styled from "styled-components";
import XHomeIconImage from "../../assets/logo-white.png";

const Button = styled.button`
  background-color: black;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50px;
  height: 50px;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  &:hover {
    background-color: #1b1b1b;
    cursor: pointer;
  }
`;

export const XHomeIcon = () => {
  return (
    <Button>
      <img src={XHomeIconImage} alt="home" width={24} height={24} />
    </Button>
  );
};
