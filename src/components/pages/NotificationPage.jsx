import React, { useEffect, useState } from "react";
import { SideBar } from "../organisms/SideBar";
import styled from "styled-components";
import { SearchBar } from "../organisms/SearchBar";
import { axiosInstance } from "../../utils/HandleAxios";

const NotificationArea = styled.div`
  background-color: black;
  color: white;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const MainArea = styled.div`
  color: white;
  width: 35%;
`;

const TitleBar = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0px 0px 10px;
  width: 100%;
  height: 8%;
  border-bottom: 1px solid #3b3b3b;
`;

const MessageArea = styled.div`
  padding: 10px 20px 10px 20px;
`;

const NameAndIconBox = styled.div`
  display: flex;
  flex-flow: column;
`;

const ImageIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const NameIcon = styled.p`
  color: white;
`;

const TweetMessage = styled.div`
  color: #787878;
`;

export const NotificationPage = () => {
  // バックエンド側から取得した通知データを保管する変数
  const [notifications, setNotifications] = useState([]);

  // バックエンド側から通知データを取得してset関数で更新する
  useEffect(() => {
    const getNotificationData = async () => {
      const response = await axiosInstance.get("/notifications");
      console.log(response.data.data.notifications);
      setNotifications(response.data.data.notifications);
    };
    getNotificationData();
  }, []);

  // 取得した通知データのアクションによって切り替えて表示するメッセージを切り替える
  const renderMessage = (notification) => {
    switch (notification.action) {
      case "favorite":
        return "さんがあなたの投稿にイイねしました。";
      case "comment":
        return "さんがあなたの投稿にコメントしました。";
      case "follow":
        return "さんがあなたをフォローしました。";
      case "retweet":
        return "さんがあなたの投稿をリツイートしました。";
    }
  };

  return (
    <NotificationArea>
      <SideBar />
      <MainArea>
        <TitleBar>通知</TitleBar>
        <MessageArea>
          {notifications.map((notification) => (
            <div key={notification.id}>
              <NameAndIconBox>
                <ImageIcon src={notification.visitor.icon_urls} />
                <NameIcon>
                  {notification.visitor.name}
                  {renderMessage(notification)}
                </NameIcon>
              </NameAndIconBox>
              {notification.tweet && (
                <TweetMessage>{notification.tweet.content}</TweetMessage>
              )}
            </div>
          ))}
        </MessageArea>
      </MainArea>
      <SearchBar />
    </NotificationArea>
  );
};
