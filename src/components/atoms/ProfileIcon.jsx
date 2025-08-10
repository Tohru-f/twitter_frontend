import React, { use, useContext } from "react";
import styled from "styled-components";
import ProfileIconImage from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

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

export const ProfileIcon = () => {
  const navigate = useNavigate();
  let login_userid = localStorage.getItem("login_userid");

  return (
    <Button onClick={() => navigate(`/users/${login_userid}`)}>
      <img src={ProfileIconImage} alt="home" width={30} height={30} />
      <Span>プロフィール</Span>
    </Button>
  );
};
