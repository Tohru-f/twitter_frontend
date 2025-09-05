import React, { useEffect, useState } from "react";
import { SideBar } from "../organisms/SideBar.jsx";
import { SearchBar } from "../organisms/SearchBar.jsx";
import styled from "styled-components";
import ArrowLeftImage from "../../assets/arrow.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LocationImage from "../../assets/location.png";
import WebsiteImage from "../../assets/link.png";
import CakeImage from "../../assets/cake.png";
import { PostComponent } from "../organisms/PostComponent.jsx";
import { CommentComponent } from "../organisms/CommentComponent.jsx";
import { LikeComponent } from "../organisms/LikeComponent.jsx";
import CalendarImage from "../../assets/calendar.png";
import dayjs from "dayjs";
import { axiosInstance } from "../../utils/HandleAxios.jsx";

const MainSpace = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ProfileBox = styled.div`
  width: 35%;
  display: flex;
  flex-flow: column;
  overflow: auto;
  scrollbar-width: none; /*Google Chrome、Firefoxへのスクロール非表示対応*/
  -ms-overflow-style: none; /*IE(Internet Explorer)・Microsoft Edgeへのスクロール非表示対応*/
  -webkit-scrollbar {
    /*Safariへのスクロール非表示対応*/
    display: none;
  }
`;

const ArrowAndName = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const ArrowImage = styled.img`
  // background-color: black;
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

const NameAdnPostNumber = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 30px;
`;

const NameTag = styled.p`
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0px;
`;

const PostNumber = styled.p`
  color: #787878;
  font-size: 13px;
  margin-top: 0px;
`;

const BackgroundAndIconBox = styled.div`
  width: 100%;
  height: 20%;
  display: inline-block; // 要素をインラインブロックとして配置し、縦方向の位置を調整して画像を重ねられるように
`;

const BackgroundArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  outline: none;
  border: 0px;
  // background-image: url(../../assets/big_tuna.jpg);
  // display: inline-block;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ProfileIconAndEditButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  // display: inline-block;
  vertical-align: top;
  margin-top: -70px; // 背景画像にアイコン画像と編集ボタンを重ねるために調整
`;

const ProfileIcon = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-left: 20px;
  border: 3px solid black
  display: inline-block
`;

const ProfileDummySpace = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-left: 20px;
  border: 3px solid black;
  display: inline-block;
  background-color: #787878;
`;

const EditButton = styled.button`
  width: 140px;
  height: 30px;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  background-color: black;
  border: 1px solid white;
  margin-right: 20px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const ProfileDetailBox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 60px 20px 20px 20px;
`;

const ProfileDetail = styled.p`
  width: 90%;
  color: white;
  margin-bottom: 10px;
`;

const LocationAndWebsiteBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
`;

const LocationIcon = styled.img``;

const LocationTag = styled.p`
  color: #787878;
  margin: 0px 0px 0px 5px;
`;

const WebsiteBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const WebsiteIcon = styled.img``;

const WebsiteTag = styled.a`
  color: #08a9ff;
  margin-left: 5px;
  text-decoration: none;
`;

const BirthdayAndStartMonthBox = styled.div`
  display: flex;
`;

const BirthdayBox = styled.div`
  display: flex;
  align-items: center;
`;

const BirthdayIcon = styled.img``;

const BirthdayTag = styled.p`
  color: #787878;
  margin: 0px 0px 0px 5px;
`;

const StartMonthBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const CalendarIcon = styled.img``;

const StartMonthTag = styled.p`
  color: #787878;
  margin: 0px 0px 0px 5px;
`;

const TweetBox = styled.div`
  width: 100%;
  height: 45%;
`;

const ProfileTabs = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #787878;
  margin-bottom: 5px;
`;

const TabButton = styled.button`
  width: 33.3%;
  color: #787878;
  background-color: black;
  border: none;
  &:hover {
    background-color: #1b1b1b;
    cursor: pointer;
  }
  // .activeとすることでReactのstate変数によって管理できる。
  // :activeにするとクリックした瞬間だけ適用される
  &.active {
  display: inline-block;
  color: white;
  font-weight: bold;
  border-bottom: 3px solid #08a9ff;
  `;

export const ProfilePage = () => {
  const navigate = useNavigate();

  // PostComponentで投稿情報を取得中の際にローディング画面の表示管理で使用
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { tweet } = location.state || ""; //一覧ページからLinkで付与された値を受け取る

  const [activeTab, setActiveTab] = useState("post");

  const [userTweets, setUserTweets] = useState([]);

  const [userComments, setUserComments] = useState([]);

  // パラメーターからidを取得する
  const { id } = useParams();

  // タブの切り替えを管理
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // ブラウザバックを管理
  const handleBack = () => {
    navigate(-1);
  };

  // idを引数にとって指定のユーザーが持つ投稿データとユーザーデータを取得する
  useEffect(() => {
    const describeUserAndTweets = async (id) => {
      setIsLoading(true);
      const response = await axiosInstance.get(`/users/${id}`, {
        timeout: 5000,
      });
      console.log(response.data);
      setUserTweets(response.data.data.tweets);
      setUserComments(response.data.data.comments);
      setIsLoading(false);
    };
    describeUserAndTweets(id);
  }, []);

  // tweetが空(undefined)の場合はプロフィールメニューからの遷移とみなし、それ以外は投稿データのリンクからの遷移とみなす。
  return (
    <MainSpace>
      <SideBar />
      <ProfileBox>
        <ArrowAndName>
          <ArrowButton onClick={handleBack}>
            <ArrowImage src={ArrowLeftImage} width={24} height={24} />
          </ArrowButton>
          <NameAdnPostNumber>
            <NameTag>{tweet.user.name}</NameTag>
            <PostNumber>{`${tweet.user.tweets.length} 件のポスト`}</PostNumber>
          </NameAdnPostNumber>
        </ArrowAndName>
        <BackgroundAndIconBox>
          {tweet.user.header_urls ? (
            <HeaderImage src={tweet.user.header_urls} />
          ) : (
            <BackgroundArea />
          )}
          <ProfileIconAndEditButton>
            {tweet.user.icon_urls ? (
              <ProfileIcon src={tweet.user.icon_urls} />
            ) : (
              <ProfileDummySpace />
            )}
          </ProfileIconAndEditButton>
        </BackgroundAndIconBox>
        <ProfileDetailBox>
          <NameTag>{tweet.user.name}</NameTag>
          <ProfileDetail>{tweet.user.profile}</ProfileDetail>
          <LocationAndWebsiteBox>
            <LocationBox>
              <LocationIcon src={LocationImage} width={24} height={24} />
              <LocationTag>{tweet.user.location}</LocationTag>
            </LocationBox>
            <WebsiteBox>
              <WebsiteIcon src={WebsiteImage} />
              <WebsiteTag href={tweet.user.website}>
                {tweet.user.website}
              </WebsiteTag>
            </WebsiteBox>
          </LocationAndWebsiteBox>
          <BirthdayAndStartMonthBox>
            <BirthdayBox>
              <BirthdayIcon src={CakeImage} />
              <BirthdayTag>{`誕生日：${tweet.user.birthday}`}</BirthdayTag>
            </BirthdayBox>
            <StartMonthBox>
              <CalendarIcon src={CalendarImage} />
              <StartMonthTag>{`${dayjs(tweet.user.created_at).format(
                "YYYY年MM月"
              )}からXを利用しています。`}</StartMonthTag>
            </StartMonthBox>
          </BirthdayAndStartMonthBox>
        </ProfileDetailBox>
        <TweetBox>
          <ProfileTabs>
            <TabButton
              onClick={() => handleTabClick("post")}
              className={activeTab === "post" ? "active" : ""}
            >
              ポスト
            </TabButton>
            <TabButton
              onClick={() => handleTabClick("comment")}
              className={activeTab === "comment" ? "active" : ""}
            >
              コメント
            </TabButton>
            <TabButton
              onClick={() => handleTabClick("like")}
              className={activeTab === "like" ? "active" : ""}
            >
              いいね
            </TabButton>
          </ProfileTabs>
          {activeTab === "post" && (
            <PostComponent userTweets={userTweets} isLoading={isLoading} />
          )}
          {activeTab === "comment" && (
            <CommentComponent
              userComments={userComments}
              isLoading={isLoading}
            />
          )}
          {activeTab === "like" && <LikeComponent />}
        </TweetBox>
      </ProfileBox>
      <SearchBar />
    </MainSpace>
  );
};
