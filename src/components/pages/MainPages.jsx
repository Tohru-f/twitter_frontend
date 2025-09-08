import React, { useState } from "react";
import styled from "styled-components";
import { SideBar } from "../organisms/SideBar";
import { TweetView } from "../organisms/TweetView";
import { SearchBar } from "../organisms/SearchBar";
import { CommentModal } from "../organisms/CommentModal";

const MainSpace = styled.div`
  background-color: black;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const MainPages = () => {
  // 投稿モーダルの表示に関するstate変数
  const [showPostModal, setShowPostModal] = useState(false);
  // 投稿モーダルを表示に切り替える
  const openPostModalHandler = () => setShowPostModal(true);
  // 投稿モーダルを非表示に切り替える
  const closePostModalHandler = () => setShowPostModal(false);
  // プロフィールモーダル表示に関するstate変数
  const [showProfileModal, setShowProfileModal] = useState(false);
  // プロフィールモーダルを表示に切り返る
  const openProfileModalHandler = () => setShowProfileModal(true);
  // プロフィールモーダルを非表示に切り替える
  const closeProfileModalHandler = () => setShowProfileModal(false);
  // コメントモーダル表示に関するstate変数
  const [showCommentModal, setShowCommentModal] = useState(false);
  // コメントモーダルを表示に切り替える
  const openCommentModal = () => setShowCommentModal(true);
  // コメントモーダルを非表示に切り替える
  const closeCommentModal = () => setShowCommentModal(false);
  // コメントモーダルで表示するためのツイートを管理
  const [tweetForComment, setTweetForComment] = useState("");

  return (
    <MainSpace>
      <SideBar
        openPostModalHandler={openPostModalHandler}
        openProfileModalHandler={openProfileModalHandler}
      />
      <TweetView
        showPostModal={showPostModal}
        closePostModalHandler={closePostModalHandler}
        showProfileModal={showProfileModal}
        openProfileModalHandler={openProfileModalHandler}
        closeProfileModalHandler={closeProfileModalHandler}
        showCommentModal={showCommentModal}
        openCommentModal={openCommentModal}
        setTweetForComment={setTweetForComment}
        tweetForComment={tweetForComment}
      />
      <SearchBar />
      <CommentModal
        close={closeCommentModal}
        show={showCommentModal}
        tweet={tweetForComment}
      />
    </MainSpace>
  );
};
