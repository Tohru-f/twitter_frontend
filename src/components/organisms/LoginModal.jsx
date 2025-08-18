import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { XLogo } from "../atoms/XLogo";
import { FloatingInput } from "../molecules/FloatingInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { HandleError } from "../../utils/HandleError";
import { saveUserDataContext } from "../providers/UserDataProvider";
import { axiosInstance } from "../../utils/HandleAxios";

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
  &:hover {
    cursor: pointer;
  }
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
  // userの初期データとして生成
  let defaultUser = {
    email: "",
    password: "",
  };

  // ログインに必要なメールアドレスとパスワードを受け取る
  const [user, setUser] = useState(defaultUser);

  // グローバルステートのログインユーザーを取得
  const { userInfo, setUserInfo } = useContext(saveUserDataContext);

  // ログイン情報の入力対応処理、nameにはカラム(email, password)がvalueには入力値が入る
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
      // 入力が空の場合は送信処理を止めて入力を促す
      if (user.email === "" || user.password === "") {
        toast.error("Email及びパスワードを両方入力してください。");
        return;
      }
      const response = await axios.post("/auth/sign_in", {
        email: user.email,
        password: user.password,
      });
      console.log(response.data.data);
      console.log(response.headers);
      console.log(new Date(response.headers.expiry * 1000));
      if (response.status === 200) {
        console.log("Signed in successfully!");
        setUser(defaultUser);
        localStorage.setItem("access-token", response.headers["access-token"]);
        localStorage.setItem("client", response.headers.client);
        localStorage.setItem("uid", response.headers.uid);

        // ログインユーザーの情報をグローバルステートに保管
        // const response = await axiosInstance.get("/users");
        setUserInfo(response.data.data);

        navigate("/main");
      }
    } catch (error) {
      HandleError(error);
    }
  };

  // Escapeキーが押下されたらモーダルを閉じる
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

  if (!show) return <></>;
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
          <Toaster position="top-center" />
        </Modal>
      )}
    </>
  );
};
