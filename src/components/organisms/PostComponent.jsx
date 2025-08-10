import React, { useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";

const UserTweetBox = styled.div`
  display: flex;
  width: 100%;
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
  align-items: center;
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
  describeUserAndTweets,
  isLoading,
  setIsLoading,
}) => {
  // パラメーターからidを取得する
  const { id } = useParams();

  const width = 100;

  // パラメーターから取得したuser_idを使ってユーザーデータを取得・表示する
  useEffect(() => {
    setIsLoading(true);
    describeUserAndTweets(id);
    setIsLoading(false);
  }, []);

  return (
    <>
      {!!userTweets && isLoading === false ? (
        userTweets.map((tweet) => (
          <Link
            key={tweet.id}
            to={`/tweets/${tweet.id}`}
            style={{ textDecoration: "none" }}
            state={{
              tweet: tweet,
            }} /* 詳細ページへ値を渡す */
          >
            <UserTweetBox>
              <IconBox>
                {tweet.user.icon_urls ? (
                  <ProfileIcon src={tweet.user.icon_urls} />
                ) : (
                  <ProfileDummyIcon />
                )}
              </IconBox>
              <ContentBox>
                <NameAndTimeBox>
                  <NameTag>{tweet.user.name}</NameTag>
                  <TimeTag>
                    {dayjs(tweet.created_at).format("YYYY年MM月DD日")}
                  </TimeTag>
                </NameAndTimeBox>
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
        ))
      ) : (
        <LoadingTag>Now Loading...</LoadingTag>
      )}
    </>
  );
};
