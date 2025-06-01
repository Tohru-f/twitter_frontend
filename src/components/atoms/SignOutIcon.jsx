import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  background-color: black;
  border-radius: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  color: white;
  border: none;
  font-size: 20px;
  margin-bottom: 20px;
  &:hover {
    background-color: #1b1b1b;
    cursor: pointer;
  }
`;

const Span = styled.span``;

export const SignOutIcon = () => {
  const access_token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await axios.delete("/users/sign_out", {
        headers: {
          "access-token": access_token,
          client: client,
          uid: uid,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        console.log("Signed out successfully!");
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.errors);
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <Button onClick={handleSignOut}>
      {/* <img src={} alt="home" width="30px" height="30px" /> */}
      <Span>サインアウト</Span>
    </Button>
  );
};
