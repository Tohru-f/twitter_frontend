import React, { useContext, useEffect, useState } from "react";
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
import { ProfileEditModal } from "../organisms/ProfileEditModal.jsx";
import dayjs from "dayjs";
import { axiosInstance } from "../../utils/HandleAxios.jsx";
import { saveUserDataContext } from "../providers/UserDataProvider.jsx";
import { DeleteConfirmModal } from "../organisms/DeleteConfirmModal.jsx";

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

export const LoginUserPage = () => {
  const navigate = useNavigate();

  const [userComments, setUserComments] = useState([]);

  const [userTweets, setUserTweets] = useState([]);

  // PostComponentで投稿情報を取得中の際にローディング画面の表示管理で使用
  const [isLoading, setIsLoading] = useState(true);

  // グローバルステートのログインユーザーを取得
  const { userInfo } = useContext(saveUserDataContext);

  // プロフィールモーダル表示に関するstate変数
  const [showProfileModal, setShowProfileModal] = useState(false);
  // プロフィールモーダルを表示に切り返る
  const openProfileModalHandler = () => {
    setShowProfileModal(true);
    setHeaderImage([]);
  };
  // プロフィールモーダルを非表示に切り替える
  const closeProfileModalHandler = () => setShowProfileModal(false);

  const [activeTab, setActiveTab] = useState("post");

  // プロフィールのヘッダー画像を管理する
  const [headerImage, setHeaderImage] = useState([]);

  // プロフィールのアイコン画像を管理する
  const [iconImage, setIconImage] = useState([]);

  // パラメーターからidを取得する
  const { id } = useParams();

  // 削除モーダル表示に関するstate変数
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const [selectedId, setSelectedId] = useState(0);

  // 表示する削除用のモーダルを管理するためのstate変数
  const [tweetOrComment, setTweetOrComment] = useState("");

  // 削除モーダルを表示に切り返る ツイート用
  const openDeleteConfirmModalHandler = (id) => {
    setDeleteConfirmModal(true);
    setSelectedId(id);
    setTweetOrComment("tweet");
  };

  // 削除モーダルを表示に切り返る コメント用
  const openDeleteConfirmModalHandlerForTweet = (id) => {
    setDeleteConfirmModal(true);
    setSelectedId(id);
    setTweetOrComment("comment");
  };

  // 削除モーダルを非表示に切り替える
  const closeDeleteModalHandler = () => setDeleteConfirmModal(false);

  // タブの切り替えを管理
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // ブラウザバックを管理
  const handleBack = () => {
    navigate(-1);
  };

  // ログインユーザーの投稿データを取得する
  useEffect(() => {
    const handleUserInfo = async () => {
      setIsLoading(true);
      const response = await axiosInstance.get("/login_users");
      console.log(response.data);
      setUserTweets(response.data.data.user.tweets);
      setUserComments(response.data.data.user.comments);
      setIsLoading(false);
    };
    handleUserInfo();
  }, []);

  // 投稿が削除された場合、直ちに再レンダリングして削除された投稿が残らないようにする。
  useEffect(() => {
    const updateUserTweets = async () => {
      const response = await axiosInstance.get("/login_users");
      setUserTweets(response.data.data.user.tweets);
      setUserComments(response.data.data.user.comments);
    };
    updateUserTweets();
  }, [deleteConfirmModal]);

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
            <NameTag>{userInfo.name}</NameTag>
            <PostNumber>{`${userTweets.length} 件のポスト`}</PostNumber>
          </NameAdnPostNumber>
        </ArrowAndName>
        <BackgroundAndIconBox>
          {userInfo.header_urls ? (
            <HeaderImage src={userInfo.header_urls} />
          ) : (
            <BackgroundArea />
          )}
          <ProfileIconAndEditButton>
            {userInfo.icon_urls ? (
              <ProfileIcon src={userInfo.icon_urls} />
            ) : (
              <ProfileDummySpace />
            )}
            <EditButton onClick={openProfileModalHandler}>
              プロフィール編集
            </EditButton>
          </ProfileIconAndEditButton>
        </BackgroundAndIconBox>
        <ProfileDetailBox>
          <NameTag>{userInfo.name}</NameTag>
          <ProfileDetail>{userInfo.profile}</ProfileDetail>
          <LocationAndWebsiteBox>
            <LocationBox>
              <LocationIcon src={LocationImage} width={24} height={24} />
              <LocationTag>{userInfo.location}</LocationTag>
            </LocationBox>
            <WebsiteBox>
              <WebsiteIcon src={WebsiteImage} />
              <WebsiteTag href={userInfo.website}>
                {userInfo.website}
              </WebsiteTag>
            </WebsiteBox>
          </LocationAndWebsiteBox>
          <BirthdayAndStartMonthBox>
            <BirthdayBox>
              <BirthdayIcon src={CakeImage} />
              <BirthdayTag>{`誕生日：${userInfo.birthday}`}</BirthdayTag>
            </BirthdayBox>
            <StartMonthBox>
              <CalendarIcon src={CalendarImage} />
              <StartMonthTag>{`${dayjs(userInfo.created_at).format(
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
            <PostComponent
              userTweets={userTweets}
              isLoading={isLoading}
              setUserTweets={setUserTweets}
              show={deleteConfirmModal}
              open={openDeleteConfirmModalHandler}
            />
          )}
          {activeTab === "comment" && (
            <CommentComponent
              userComments={userComments}
              isLoading={isLoading}
              show={deleteConfirmModal}
              open={openDeleteConfirmModalHandlerForTweet}
            />
          )}
          {activeTab === "like" && <LikeComponent />}
        </TweetBox>
      </ProfileBox>
      <SearchBar />
      <ProfileEditModal
        show={showProfileModal}
        close={closeProfileModalHandler}
        headerImage={headerImage}
        setHeaderImage={setHeaderImage}
        iconImage={iconImage}
        setIconImage={setIconImage}
        setUserTweets={setUserTweets}
      />
      {tweetOrComment === "tweet" && (
        <DeleteConfirmModal
          showTweet={deleteConfirmModal}
          close={closeDeleteModalHandler}
          id={selectedId}
        />
      )}
      {tweetOrComment === "comment" && (
        <DeleteConfirmModal
          showComment={deleteConfirmModal}
          close={closeDeleteModalHandler}
          id={selectedId}
        />
      )}
    </MainSpace>
  );
};
