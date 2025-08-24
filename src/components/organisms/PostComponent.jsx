import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Popover } from "radix-ui";
import { axiosInstance } from "../../utils/HandleAxios";

const UserTweetBox = styled.div`
  display: flex;
  width: 100%;
`;

const HeaderBox = styled.div`
  display: flex;
`;

const IconBox = styled.div`
  margin-left: 10px;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileDummyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid white;
`;

const ContentBox = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0px 10px 10px 10px;
  word-break: break-all; // 枠をはみ出す場合は折り返し表示
`;

const NameAndTimeBox = styled.div`
  display: flex;
  align-items: space-around;
  margin-left: 5px;
`;

const NameTag = styled.p`
  color: white;
  font-weight: bold;
  margin: 0;
`;

const TimeTag = styled.p`
  margin: 0px 0px 0px 10px;
  color: #787878;
`;

const DottedMenu = styled.button`
  color: white;
`;

const ContentTag = styled.p`
  color: white;
  margin-left: 5px;
  margin-top: 0px;
`;

const TweetedImage = styled.img`
  margin-bottom: 0px;
  object-fit: cover;
`;

const LoadingTag = styled.h2`
  color: white;
`;

export const PostComponent = ({
  userTweets,
  isLoading,
  setUserTweets,
  open,
}) => {
  const width = 100;

  // const handleDeleteButton = async (id) => {
  //   const message = "削除しますか?";
  //   const yes = window.confirm(message);
  //   if (yes) {
  //     const response = await axiosInstance.delete(`/tweets/${id}`);
  //     console.log(response.data);
  //   } else {
  //     return;
  //   }
  // };

  if (userTweets.length === 0 || isLoading)
    return <LoadingTag>Now Loading...</LoadingTag>;
  return (
    <>
      {userTweets.map((tweet) => (
        <div key={tweet.id}>
          <HeaderBox>
            <IconBox>
              {tweet.user.icon_urls ? (
                <ProfileIcon src={tweet.user.icon_urls} />
              ) : (
                <ProfileDummyIcon />
              )}
            </IconBox>
            <NameAndTimeBox>
              <NameTag>{tweet.user.name}</NameTag>
              <TimeTag>
                {dayjs(tweet.created_at).format("YYYY年MM月DD日")}
              </TimeTag>
              <Popover.Root>
                <Popover.Trigger
                  className="PopoverTrigger"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    margin: 0,
                    border: "none",
                  }}
                >
                  ...
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className="PopoverContent"
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    onClick={() => open(tweet.id)}
                  >
                    削除
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </NameAndTimeBox>
          </HeaderBox>
          <Link
            to={`/tweets/${tweet.id}`}
            style={{ textDecoration: "none" }}
            state={{
              tweet: tweet,
            }} /* 詳細ページへ値を渡す */
          >
            <UserTweetBox>
              <ContentBox>
                <ContentTag>{tweet.content}</ContentTag>
                {tweet.image_urls.length > 0 && (
                  <TweetedImage
                    src={tweet.image_urls}
                    width={width + "%"}
                    height="auto"
                  />
                )}
              </ContentBox>
            </UserTweetBox>
          </Link>
        </div>
      ))}
    </>
  );
};
