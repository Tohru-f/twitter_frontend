import React from "react";
import styled from "styled-components";
import { ImageIcon } from "../atoms/ImageIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { SideBar } from "../organisms/SideBar";
import { SearchBar } from "../organisms/SearchBar";
import ArrowLeftImage from "../../assets/arrow.png";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const MainSpace = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const TweetBox = styled.div`
  width: 35%;
  display: flex;
  flex-flow: column;
  // justify-content: center;
  margin-top: 10px;
`;

const NameAndIconBox = styled.div`
  margin-left: 10px;
  display: flex;
  width: 100%;
`;

const NameTag = styled.p`
  margin: 0px 0px 30px 10px;
  font-weight: bold;
  color: white;
`;

const ArrowAndPost = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  background-color: black;
  border-radius: 50%;
  border: none;
  &:hover {
    background-color: #1b1b1b;
    cursor: pointer;
  }
`;

const ArrowImage = styled.img`
  // background-color: black;
`;

const PostLetter = styled.p`
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-left: 40px;
`;

const TimeTag = styled.p`
  // margin: 0px 0px 0px 10px;
  color: #787878;
`;

const ContentBox = styled.div`
  width: 100%;
  word-break: break-all;
  color: white;
  margin-left: 10px;
  margin-top: 0px;
`;

const ContentTag = styled.p`
  margin-top: 0px;
  width: 99%;
`;

export const TweetDetailsPages = () => {
  const location = useLocation();
  const { tweet } = location.state; //一覧ページからLinkで付与された値を受け取る
  const { page } = location.state; //一覧ページからLinkで付与された値を受け取る
  const navigate = useNavigate();
  const width = 95;
  const height = 95;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MainSpace>
      <SideBar />
      <TweetBox>
        <ArrowAndPost>
          <ArrowButton onClick={handleBack}>
            <ArrowImage src={ArrowLeftImage} width={24} height={24} />
          </ArrowButton>
          <PostLetter>ポスト</PostLetter>
        </ArrowAndPost>
        <NameAndIconBox>
          <ImageIcon />
          {/* <p>{tweet.user.name}</p> */}
          <NameTag>名無しの権兵衛</NameTag> {/* プロフィール実装までの仮 */}
        </NameAndIconBox>
        <ContentBox>
          <ContentTag>{tweet.content}</ContentTag>
          {tweet.image_urls.length > 0 && (
            <img
              src={tweet.image_urls}
              width={width + "%"}
              height={height + "%"}
            />
          )}
          <TimeTag>
            {" "}
            {/* 時間の表示を午前・午後 何時何分 年・月・日で表示 */}
            {dayjs(tweet.created_at)
              .tz("Asia/Tokyo")
              .format("a hh:mm YYYY年MM月DD日")}
          </TimeTag>
        </ContentBox>
      </TweetBox>
      <SearchBar />
    </MainSpace>
  );
};
