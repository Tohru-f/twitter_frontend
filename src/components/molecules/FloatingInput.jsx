import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const InputBox = styled.div`
  position: relative;
  font-size: 14px;
  padding-top: 20px;
  width: 75%;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  border: solid 1px #3b3b3b;
  outline: none;
  padding-left: 12px;
  padding-top: 15px;
  padding-bottom: 0;
  font-size: 16px;
  &:focus {
    border: solid 2px #1d9bf0;
  }
`;

const PlaceHolder = styled.span`
  position: absolute;
  left: 10px;
  top: 70%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
  background: black;
  font-size: 20px;
  transition: top 0.3s, font-size 0.3s, color 0.3s;
  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 40px;
      font-size: 12px;
      color: #1d9bf0;
    `}
`;

export const FloatingInput = ({ label, value, onChange, type, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputBox>
      <Input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <PlaceHolder $isActive={isFocused || value}>{label}</PlaceHolder>
    </InputBox>
  );
};
