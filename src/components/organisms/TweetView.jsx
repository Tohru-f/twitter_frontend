import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TweetTabs } from "../molecules/TweetTabs";
import { RecommendationComponent } from "./RecommendationComponent";
import { FollowComponent } from "./FollowComponent";
import { TweetInput } from "./TweetInput";
import { PostModal } from "./PostModal";
import { axiosInstance } from "../../utils/HandleAxios";
import { HandleError } from "../../utils/HandleError";

const TweetBox = styled.div`
  width: 35%;
  color: white;
`;

export const TweetView = ({ showPostModal, closePostModalHandler }) => {
  // タブの切り替えを管理するstate変数
  const [activeTab, setActiveTab] = useState("recommendation");
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalTweets, setTotalTweets] = useState(0);
  const query = new URLSearchParams({ limit: 10, offset: 0 });

  // 引数のtabにrecommendation、もしくはfollowを入れることでstate関数によりタブを切り替える
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 初期画面でおすすめタブのデータを取得する
  useEffect(() => {
    let ignore = false;
    const describeTweet = async () => {
      try {
        const response = await axiosInstance.get(`/tweets?${query.toString()}`);
        if (!ignore) {
          console.log(response.data);
          setTweets(response.data.data.tweets);
          setTotalTweets(response.data.data.count);
          setIsLoading(false);
        }
      } catch (error) {
        HandleError(error);
      }
    };

    describeTweet();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <TweetBox>
      <TweetTabs activeTab={activeTab} onTabClick={handleTabClick} />
      <TweetInput />
      {activeTab === "recommendation" && (
        <RecommendationComponent
          tweets={tweets}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setTweets={setTweets}
          totalTweets={totalTweets}
        />
      )}
      {activeTab === "follow" && <FollowComponent />}
      <PostModal show={showPostModal} close={closePostModalHandler}></PostModal>
    </TweetBox>
  );
};
