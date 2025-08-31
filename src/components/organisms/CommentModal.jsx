import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../utils/HandleAxios";
import { saveUserDataContext } from "../providers/UserDataProvider";

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 2rem;
  border-radius: 15px;
  min-width: 30%;
  max-height: 80%;
  padding-top: 10px;
  overflow: auto;
  // display: flex;
  // flex-flow: column;
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

const CloseButton = styled.button`
  color: white;
  background-color: black;
  border: none;
  font-size: 24px;
  text-align: left;
`;

const TweetMessage = styled.p`
  color: white;
`;

const CommentInput = styled.input`
  color: white;
  background-color: black;
  border: none;
  font-size: 20px;
  width: 100%;
  margin-bottom: 10px;
  word-break: break-all;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: white;
  color: black;
  padding: 2px 10px;
  border-radius: 15px;
  float: right;
`;

export const CommentModal = ({ close, show, tweet }) => {
  // コメントの内容を管理
  const [comment, setComment] = useState("");

  // コメント投稿時にユーザーidを使うので、userInfoから取得
  const { userInfo } = useContext(saveUserDataContext);

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSend = async () => {
    const response = await axiosInstance.post("/comments", {
      content: comment,
      tweet_id: tweet.id,
    });
    console.log(response.data);
    setComment("");
    close();
  };

  if (!show) return <></>;
  return (
    <>
      <Overlay onClick={close}></Overlay>
      <Modal>
        <CloseButton onClick={close}>×</CloseButton>
        <TweetMessage>{tweet.content}</TweetMessage>
        <CommentInput
          placeholder="返信をポスト"
          onChange={handleCommentChange}
        />
        <br></br>
        <SendButton onClick={handleCommentSend}>返信</SendButton>
      </Modal>
    </>
  );
};
