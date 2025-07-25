import React from "react";
import styled from "styled-components";
import HomeIconImage from "../../assets/home.png";

const Button = styled.button`
  background-color: black;
  border-radius: 20px;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 40px;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  &:hover {
    background-color: #1b1b1b;
    cursor: pointer;
  }
`;

const Span = styled.span`
  padding-left: 20px;
`;

export const HomeIcon = () => {
  return (
    <Button>
      <img src={HomeIconImage} alt="home" width={30} height={30} />
      <Span>ホーム</Span>
    </Button>
  );
};
