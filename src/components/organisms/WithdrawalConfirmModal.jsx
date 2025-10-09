import React, { useEffect } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../utils/HandleAxios";
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
  min-width: 30%;
  max-height: 80%;
  padding-top: 10px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
    border-radius: 100px;
    border: 1px solid #3b3b3b;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3b3b3b;
    border-radius: 100px;
  }
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

const ConfirmContent = styled.p`
  color: white;
`;

const MessageBox = styled.div`
  display: flex;
  justify-content: center;
`;

const MessageButton = styled.button`
  border-radius: 10px;
`;

export const WithdrawalConfirmModal = ({ show, close }) => {
  useEffect(() => {
    // showがtrue且つ、押下されたキーがEscapeボタンの場合に実行される
    const onKeyDownEsc = (event) => {
      if (show && event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    // window全体にイベントリスナーを追加
    window.addEventListener("keydown", onKeyDownEsc);
    // useEffectの再実行やアンマウント時に前回のイベントリスナーを削除
    return () => window.removeEventListener("keydown", onKeyDownEsc);
  }, [close]);

  const navigate = useNavigate();

  // 退会後にサインアウトしてローカルストレージを空にする
  const handleDiscardAccount = async () => {
    // 退会処理としてユーザーを論理削除する
    const response1 = await axiosInstance.delete("/users");
    console.log(response1.data);
    close();
    // 論理削除したユーザーをサインアウトさせる
    const response2 = await axiosInstance.delete("/auth/sign_out");
    console.log(response2.data);
    localStorage.clear();
    navigate("/");
  };

  if (!show) return <></>;
  return (
    <>
      <Overlay onClick={close}></Overlay>
      <Modal>
        <ConfirmContent>本サービスを退会しますか？</ConfirmContent>
        <MessageBox>
          <MessageButton onClick={handleDiscardAccount}>はい</MessageButton>
          <MessageButton onClick={close}>いいえ</MessageButton>
        </MessageBox>
      </Modal>
    </>
  );
};
