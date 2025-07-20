import React, { useState } from "react";
import styled from "styled-components";
import { SideBar } from "../organisms/SideBar";
import { TweetView } from "../organisms/TweetView";
import { SearchBar } from "../organisms/SearchBar";

const MainSpace = styled.div`
  background-color: black;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const MainPages = () => {
  // モーダルの表示に関するstate変数
  const [showPostModal, setShowPostModal] = useState(false);
  // モーダルを表示に切り替える
  const openPostModalHandler = () => setShowPostModal(true);
  // モーダルを非表示に切り替える
  const closePostModalHandler = () => setShowPostModal(false);

  return (
    <MainSpace>
      <SideBar openPostModalHandler={openPostModalHandler} />
      <TweetView
        showPostModal={showPostModal}
        closePostModalHandler={closePostModalHandler}
      />
      <SearchBar />
    </MainSpace>
  );
};
