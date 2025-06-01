import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { XLogo } from "../atoms/XLogo";
import { FloatingInput } from "../molecules/FloatingInput";
import axios from "axios";
import AxiosBaseService from "../../services/AxiosBaseService";
import { useNavigate } from "react-router-dom";

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 2rem;
  border-radius: 15px;
  min-width: 600px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(91, 112, 131, 0.4);
`;

const Button = styled.button`
  width: 75%;
  height: 60px;
  border-radius: 9999px;
  background-color: white;
  color: black;
  font-size: 17px;
  font-weight: bold;
  margin-top: 40px;
`;

const Title = styled.span`
  color: white;
  font-size: 31px;
  font-weight: bold;
  text-align: left;
  width: 75%;
  height: 75px;
`;

export const LoginModal = ({ show, close }) => {
  let defaultUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(defaultUser);

  const handleUserChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post("/users/sign_in", {
        email: user.email,
        password: user.password,
      });
      console.log(response.data);
      console.log(response.headers);
      setUser(defaultUser);
      if (response.status === 200) {
        console.log("Signed in successfully!");
        localStorage.setItem("access-token", response.headers["access-token"]);
        localStorage.setItem("client", response.headers.client);
        localStorage.setItem("uid", response.headers.uid);
        navigate("/main");
      }
    } catch (error) {
      console.error(error.response.data.errors);
    }
  };

  useEffect(() => {
    const onKeyDownEsc = (event) => {
      if (show && event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDownEsc);
    return () => window.removeEventListener("keydown", onKeyDownEsc);
  }, [show, close]);

  return (
    <>
      {show && <Overlay onClick={close}></Overlay>}
      {show && (
        <Modal>
          <XLogo width="28px" height="26px" box_height="53px" />
          <Title>Xにログイン</Title>
          <FloatingInput
            type="text"
            label="メールアドレス"
            name="email"
            value={user.email}
            onChange={handleUserChange}
          />
          <FloatingInput
            type="password"
            label="パスワード"
            name="password"
            value={user.password}
            onChange={handleUserChange}
          />
          <Button onClick={handleSignIn}>ログイン</Button>
        </Modal>
      )}
    </>
  );
};
