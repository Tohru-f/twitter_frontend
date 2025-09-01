import React, { useState } from "react";
import styled from "styled-components";
import { TweetTabs } from "../molecules/TweetTabs";
import { RecommendationComponent } from "./RecommendationComponent";
import { FollowComponent } from "./FollowComponent";
import { TweetInput } from "./TweetInput";
import { PostModal } from "./PostModal";

const TweetBox = styled.div`
  width: 35%;
  color: white;
  z-index: 20;
  overflow: auto; // スクロールを許可
  scrollbar-width: none; /*Google Chrome、Firefoxへのスクロール非表示対応*/
  -ms-overflow-style: none; /*IE(Internet Explorer)・Microsoft Edgeへのスクロール非表示対応*/
  -webkit-scrollbar{  /*Safariへのスクロール非表示対応*/
  display: none;}
}
`;

export const TweetView = ({
  showPostModal,
  closePostModalHandler,
  openCommentModal,
  setTweetForComment,
  showCommentModal,
}) => {
  // タブの切り替えを管理するstate変数
  const [activeTab, setActiveTab] = useState("recommendation");

  // 引数のtabにrecommendation、もしくはfollowを入れることでstate関数によりタブを切り替える
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TweetBox>
      <TweetTabs activeTab={activeTab} onTabClick={handleTabClick} />
      <TweetInput />
      {activeTab === "recommendation" && (
        <RecommendationComponent
          open={openCommentModal}
          setTweetForComment={setTweetForComment}
          showCommentModal={showCommentModal}
        />
      )}
      {activeTab === "follow" && <FollowComponent />}
      <PostModal show={showPostModal} close={closePostModalHandler}></PostModal>
    </TweetBox>
  );
};
