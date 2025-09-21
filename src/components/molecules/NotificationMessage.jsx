import React from "react";
import styled from "styled-components";

const NotificationBox = styled.div`
  border-bottom: 1px solid #3b3b3b;
  padding-bottom: 20px;
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

export const NotificationMessage = ({ notification, message }) => {
  return (
    <NotificationBox>
      <NameAndIconBox>
        <ImageIcon src={notification.visitor.icon_urls} />
        <NameIcon>
          {notification.visitor.name}
          {message}
        </NameIcon>
      </NameAndIconBox>
      {notification.tweet && (
        <TweetMessage>{notification.tweet.content}</TweetMessage>
      )}
    </NotificationBox>
  );
};
