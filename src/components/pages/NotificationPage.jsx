import React, { useEffect, useState } from "react";
import { SideBar } from "../organisms/SideBar";
import styled from "styled-components";
import { SearchBar } from "../organisms/SearchBar";
import { axiosInstance } from "../../utils/HandleAxios";
import { NotificationMessage } from "../molecules/NotificationMessage";

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

  // 取得した通知データをアクションによって切り替えて表示する
  const renderMessage = (notification) => {
    switch (notification.action) {
      case "favorite":
        const messageForFavorite = "さんがあなたの投稿にイイねしました。";
        return (
          <NotificationMessage
            key={notification.id}
            notification={notification}
            message={messageForFavorite}
          />
        );
      case "comment":
        const messageForComment = "さんがあなたの投稿にコメントしました。";
        return (
          <NotificationMessage
            key={notification.id}
            notification={notification}
            message={messageForComment}
          />
        );
      case "follow":
        const messageForFollow = "さんがあなたをフォローしました。";
        return (
          <NotificationMessage
            key={notification.id}
            notification={notification}
            message={messageForFollow}
          />
        );
      case "retweet":
        const messageForRetweet = "さんがあなたの投稿をリツイートしました。";
        return (
          <NotificationMessage
            key={notification.id}
            notification={notification}
            message={messageForRetweet}
          />
        );
    }
  };

  return (
    <NotificationArea>
      <SideBar />
      <MainArea>
        <TitleBar>通知</TitleBar>
        <MessageArea>
          {notifications.map((notification) => renderMessage(notification))}
        </MessageArea>
      </MainArea>
      <SearchBar />
    </NotificationArea>
  );
};
