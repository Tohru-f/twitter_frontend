import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border-radius: 20px;
  text-align: center;
  width: 200px;
  height: 40px;
  color: black;
  border: none;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
  &:hover {
    background-color: #e1e3e1;
    cursor: pointer;
  }
`;

const Span = styled.span`
  padding-left: 20px;
`;

export const PostIcon = () => {
  return <Button>ポストする</Button>;
};
