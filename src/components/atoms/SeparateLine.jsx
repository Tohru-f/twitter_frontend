import React from "react";
import styled from "styled-components";

const Or_space = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  content: "";
  flex-grow: 1;
  height: 1px;
  background: #3b3b3b;
  margin: 20px 0;
`;

export const SeparateLine = () => {
  return <Or_space></Or_space>;
};
