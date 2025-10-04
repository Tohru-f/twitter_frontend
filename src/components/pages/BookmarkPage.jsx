import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SideBar } from "../organisms/SideBar";
import { SearchBar } from "../organisms/SearchBar";
import ArrowLeftImage from "../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/HandleAxios";
import dayjs, { extend, locale } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// 投稿日の表示を現在の日付から「何日前」で表示する
locale("ja");
extend(relativeTime);

const BookmarkArea = styled.div`
  display: flex;
`;

const BookmarkDisplayArea = styled.div`
  width: 35%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3b3b3b;
  width: 100%;
  heigh: 10%;
`;

const BackButton = styled.button`
  background-color: black;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.p`
  color: white;
  font-weight: bold;
  margin-left: 20px;
  font-size: 20px;
`;

const DisplayArea = styled.div`
  width: 100%;
  height: 90%;
  color: white;
  padding: 10px 10px;
`;

const TweetBox = styled.div`
  border-bottom: 1px solid #3b3b3b;
`;

const IconAndNameAndTime = styled.div`
  display: flex;
  align-items: center;
`;

const ImageIcon = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

const NameTag = styled.p`
  color: white;
  margin-left: 1%;
`;

const TimeTag = styled.p`
  color: #787878;
  margin-left: 1%;
`;

const TweetContent = styled.p`
  color: white;
  margin-left: 30px;
  margin-top: 0px;
`;

const TweetImage = styled.img`
  width: 95%;
`;

export const BookmarkPage = () => {
  const navigate = useNavigate();

  // バックエンド側から取得するブックマークデータを管理する
  const [bookmarks, setBookmarks] = useState([]);

  const handleBackButton = () => {
    navigate("/main");
  };

  // 初期レンダリングでバックエンド側から取得したブックマークデータを表示できるようにする
  useEffect(() => {
    const getBookmarkInformation = async () => {
      const response = await axiosInstance.get("/bookmarks");
      console.log(response.data);
      setBookmarks(response.data.data.bookmarks);
    };
    getBookmarkInformation();
  }, []);

  return (
    <BookmarkArea>
      <SideBar />
      <BookmarkDisplayArea>
        <Header>
          <BackButton onClick={handleBackButton}>
            <img src={ArrowLeftImage} />
          </BackButton>
          <HeaderTitle>すべてのブックマーク</HeaderTitle>
        </Header>
        <DisplayArea>
          {!!bookmarks &&
            bookmarks.map((bookmark) => (
              <TweetBox key={bookmark.id}>
                <IconAndNameAndTime>
                  <ImageIcon src={bookmark.tweet.user.icon_urls} />
                  <NameTag>{bookmark.tweet.user.name}</NameTag>
                  <TimeTag>
                    {dayjs(bookmark.tweet.created_at).fromNow()}
                  </TimeTag>
                </IconAndNameAndTime>
                <TweetContent>{bookmark.tweet.content}</TweetContent>
                {bookmark.tweet.image_urls && (
                  <TweetImage src={bookmark.tweet.image_urls} />
                )}
              </TweetBox>
            ))}
        </DisplayArea>
      </BookmarkDisplayArea>
      <SearchBar />
    </BookmarkArea>
  );
};
