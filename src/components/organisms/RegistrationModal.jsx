import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { XLogo } from "../atoms/XLogo";
import { FloatingInput } from "../molecules/FloatingInput";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
  background-color: #8a8a94;
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

export const RegistrationModal = ({ show, close }) => {
  // userの初期データを生成
  let defaultUser = {
    phone_number: "",
    email: "",
    birthday: "",
    password: "",
    password_confirmation: "",
  };

  const [user, setUser] = useState(defaultUser);

  // ユーザーからの入力を処理対応、nameにはカラム(emailなど)、valueには入力値が入る。
  const handleUserChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    try {
      // 入力項目が一つでも空であれば送信処理を止めてトーストで入力を促す
      if (
        user.phone_number === "" ||
        user.email === "" ||
        user.birthday === "" ||
        user.password === "" ||
        user.password_confirmation === ""
      ) {
        toast.error("全ての項目を入力してください。");
        return;
      }
      // ユーザー作成に必要なデータをAPI側に送信する
      // confirm_success_urlはユーザーを作成して確認メールのアカウント確認ボタンを押した後に遷移するURL
      const response = await axios.post("/users", {
        phone_number: user.phone_number,
        email: user.email,
        birthday: user.birthday,
        password: user.password,
        password_confirmation: user.password_confirmation,
        confirm_success_url: "http://localhost:5173",
      });
      console.log(response.data);
      if (response.status === 200) {
        console.log("Signed up successfully!");
        setUser(defaultUser);
        close();
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.errors);
      } else {
        console.error(error.message);
      }
    }
  };

  // Escapeキーを押下した時にモーダルを閉じる
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
          <Title>アカウントを作成</Title>
          <FloatingInput
            type="text"
            label="電話番号"
            name="phone_number"
            value={user.phone_number}
            onChange={handleUserChange}
            maxLength="5"
          />
          <FloatingInput
            type="text"
            label="メールアドレス"
            name="email"
            value={user.email}
            onChange={handleUserChange}
          />
          <FloatingInput
            type="text"
            label="生年月日"
            name="birthday"
            value={user.birthday}
            onChange={handleUserChange}
          />
          <FloatingInput
            type="password"
            label="パスワード"
            name="password"
            value={user.password}
            onChange={handleUserChange}
          />
          <FloatingInput
            type="password"
            label="パスワード(確認用)"
            name="password_confirmation"
            value={user.password_confirmation}
            onChange={handleUserChange}
          />
          <Button onClick={handleSignUp}>登録</Button>
          <Toaster position="top-center" />
        </Modal>
      )}
    </>
  );
};
