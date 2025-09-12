import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs, { locale, extend } from "dayjs";
import "dayjs/locale/ja";
import { HandleError } from "../../utils/HandleError";
import toast from "react-hot-toast";
import { HandleOffset } from "../../utils/HandleOffset";
import { HandlePagination } from "../../utils/HandlePagination";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveUserDataContext } from "../providers/UserDataProvider";
import CommentImage from "../../assets/comment.png";
import RepostImage from "../../assets/repost.png";
import Retweet_done from "../../assets/retweet-done.png";
import Retweet_notyet from "../../assets/retweet-notyet.png";
import Favorite_notyet from "../../assets/favorite-notyet.png";
import Favorite_done from "../../assets/favorite-done.png";
import LikeImage from "../../assets/like.png";
import NotBookmarkImage from "../../assets/not_bookmark.png";
import { axiosInstance } from "../../utils/HandleAxios";

// 投稿日の表示を現在の日付から「何日前」で表示する
locale("ja");
extend(relativeTime);

const LinkedBox = styled.div`
  width: 100%;
`;

const TweetBox = styled.div`
  width: 85%;
  display: flex;
  flex-flow: column;
  margin-top: 10px;
`;

const IconAndNameAndTimeBox = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const IconBox = styled.div`
  margin-left: 10px;
  display: flex;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileIconDummy = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid white;
`;

const NameTag = styled.p`
  margin: 0px 0px 0px 5px;
  font-weight: bold;
  color: white;
`;

const TimeTag = styled.p`
  margin: 0px 0px 0px 10px;
  color: white;
`;

const ContentBox = styled.div`
  width: 100%;
  margin: 0px 10px 10px 55px;
  word-break: break-all;
  color: white;
`;

const ContentTag = styled.p`
  margin-top: 0px;
`;

const TweetedImage = styled.img`
  margin-bottom: 0px;
  object-fit: cover;
`;

const PaginationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FirstPageButton = styled.button`
  background-color: white;
  border-radius: 5px;
`;

const LastPageButton = styled.button`
  background-color: white;
  border-radius: 5px;
`;

const PrevButton = styled.button`
  background-color: white;
  border-radius: 5px;
`;

const NextButton = styled.button`
  background-color: white;
  border-radius: 5px;
`;

const IconsBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const IconAndNumber = styled.div`
  display: flex;
  align-items: start;
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const NumberPlate = styled.span`
  color: white;
  margin-left: 5px;
`;

export const RecommendationComponent = ({
  open,
  setTweetForComment,
  showCommentModal,
  tweetForComment,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalTweets, setTotalTweets] = useState(0);

  // グローバルステートのログインユーザーを取得
  const { userInfo } = useContext(saveUserDataContext);

  // 再レンダリングを誘発させるためのstate変数
  const [update, setUpdate] = useState(false);

  // newOffset, newPage, maxPagesはstate変数のままで管理するとレンダリングできないので、ローカル変数を使用
  let maxPages = Math.ceil(totalTweets / 10);
  const width = 100;

  // URL上のクエリパラメーターを取得する
  const query_parameter = new URLSearchParams(location.search);
  // queryで取得したデータは文字列なので数字に変換する。
  const page = parseInt(query_parameter.get("page"), 10) || 1;
  let newOffset = (page - 1) * 10;
  const [currentPage, setCurrentPage] = useState(null);
  let newPage;

  // 初回レンダリング時、page変更時の投稿データを取得する。コメント投稿後にも動かす
  useEffect(() => {
    setCurrentPage(page);
    describeDesignatedTweet(page);
  }, [page, showCommentModal, update]);

  // 現在のページから一つ前のページへ遷移する
  const describePrevTweet = async () => {
    try {
      if (newOffset > 0) {
        newOffset = newOffset - 10;
        newPage = newOffset / 10 + 1;
        console.log(newOffset);
        navigate(`/main?page=${newPage}`);
      } else {
        toast("最初のページです。");
        return;
      }
    } catch (error) {
      HandleError(error);
    }
  };

  // 現在のページから次のページへ遷移する
  const describeNextTweet = async () => {
    try {
      if (totalTweets > newOffset + 10) {
        newOffset = newOffset + 10;
        newPage = newOffset / 10 + 1;
        console.log(newOffset);
        navigate(`/main?page=${newPage}`);
      } else {
        toast("最後のページです。");
        return;
      }
    } catch (error) {
      HandleError(error);
    }
  };

  // ページ数のボタンをクリックしたら指定のページへ遷移する
  const describeSelectedTweet = async (i) => {
    // 押されたボタンのページ数を取得
    newPage = i;
    // 指定したページの投稿情報を取得する
    try {
      setCurrentPage(newPage);
      if (newPage !== page) {
        navigate(`/main?page=${newPage}`);
      }
    } catch (error) {
      HandleError(error);
    }
  };

  // ページ数のボタンをクリックしたら指定ページのデータを取得する
  const describeDesignatedTweet = async (i) => {
    // 押されたボタンのページ数を取得
    newPage = i;
    // 指定したページの投稿情報を取得する
    try {
      newOffset = (newPage - 1) * 10;
      HandleOffset({
        setIsLoading,
        newOffset,
        setTweets,
        setTotalTweets,
      });
    } catch (error) {
      HandleError(error);
    }
  };

  // ページネーション用のページ数を表示させる。表示するページ数は5ページ分とする
  const renderPageNumbers = () => {
    const pageNumbers = [];
    // 総ページ数が5ページ以上の場合は表示方法を分ける
    if (5 <= maxPages) {
      // 現在のページが1 or 2ページ目の場合
      if (currentPage === 1 || currentPage === 2) {
        for (let i = 1; i <= maxPages && pageNumbers.length <= 4; i++) {
          HandlePagination({
            i,
            describeSelectedTweet,
            pageNumbers,
            currentPage,
          });
        }
        // 現在のページが最終ページの場合
      } else if (currentPage === maxPages) {
        for (
          let i = currentPage - 4;
          i <= maxPages && pageNumbers.length <= 4;
          i++
        ) {
          HandlePagination({
            i,
            describeSelectedTweet,
            pageNumbers,
            currentPage,
          });
        }
        // 現在のページが最終ページの1つ前の場合
      } else if (currentPage === maxPages - 1) {
        for (
          let i = currentPage - 3;
          i <= maxPages && pageNumbers.length <= 4;
          i++
        ) {
          HandlePagination({
            i,
            describeSelectedTweet,
            pageNumbers,
            currentPage,
          });
        }
        //　現在のページの前後に2ページずつ存在する場合
      } else {
        for (
          let i = currentPage - 2;
          i <= maxPages && pageNumbers.length <= 4;
          i++
        ) {
          HandlePagination({
            i,
            describeSelectedTweet,
            pageNumbers,
            currentPage,
          });
        }
      }
      // 総ページ数が4ページ以下の場合は1ページ目から順番に表示するのみ。表示形式は指定無し
    } else if (maxPages < 5) {
      for (let i = 1; i <= maxPages && pageNumbers.length <= 3; i++) {
        HandlePagination({
          i,
          describeSelectedTweet,
          pageNumbers,
          currentPage,
        });
      }
    }
    return pageNumbers;
  };

  // コメントモーダルの表示と対象ツイートをstate変数に登録する
  const handleCommentModal = (tweet) => {
    open();
    setTweetForComment(tweet);
  };

  // リツイートを管理
  const handleRetweet = async (id) => {
    const response = await axiosInstance.post(`/tweets/${id}/retweets`);
    console.log(response.data);
    // state変数を反対の値に切り替えることで再レンダリングを誘発する
    setUpdate(update ? false : true);
  };

  // リツイート削除を管理
  const handleDeleteRetweet = async (id) => {
    const response = await axiosInstance.delete(`/tweets/${id}/retweets`);
    console.log(response.data);
    // state変数を反対の値に切り替えることで再レンダリングを誘発する
    setUpdate(update ? false : true);
  };

  // コンポーネント内で使用する変数。リツイートのアイコン表示に関してsome関数の結果を代入する
  let retweeted;

  // イイねを管理
  const handleFavorite = async (id) => {
    const response = await axiosInstance.post(`/tweets/${id}/favorites`);
    console.log(response.data);
    // state変数を反対の値に切り替えることで再レンダリングを誘発する
    setUpdate(update ? false : true);
  };

  // イイね削除を管理
  const handleDeleteFavorite = async (id) => {
    const response = await axiosInstance.delete(`/tweets/${id}/favorites`);
    console.log(response.data);
    // state変数を反対の値に切り替えることで再レンダリングを誘発する
    setUpdate(update ? false : true);
  };

  // コンポーネント内で使用する変数。イイねのアイコン表示に関してsome関数の結果を代入する
  let favorite_done;

  return (
    <>
      {isLoading && <h2>Now Loading...</h2>}
      {!!tweets &&
        tweets.map((tweet) => (
          <div key={tweet.id}>
            <LinkedBox>
              <TweetBox>
                <IconAndNameAndTimeBox>
                  {/* プロフィール画面を分岐させる */}
                  {userInfo.id === tweet.user.id ? (
                    <Link to={"/profile"} style={{ textDecoration: "none" }}>
                      <IconBox>
                        {tweet.user.icon_urls ? (
                          <ProfileIcon src={tweet.user.icon_urls} />
                        ) : (
                          <ProfileIconDummy />
                        )}
                        <NameTag>{tweet.user.name}</NameTag>{" "}
                      </IconBox>
                    </Link>
                  ) : (
                    <Link
                      to={`/users/${tweet.user.id}`}
                      style={{ textDecoration: "none" }}
                      state={{
                        tweet: tweet,
                      }} /* プロフィールページへ値を渡す */
                    >
                      <IconBox>
                        {tweet.user.icon_urls ? (
                          <ProfileIcon src={tweet.user.icon_urls} />
                        ) : (
                          <ProfileIconDummy />
                        )}
                        <NameTag>{tweet.user.name}</NameTag>{" "}
                      </IconBox>
                    </Link>
                  )}
                  <Link
                    to={`/tweets/${tweet.id}`}
                    style={{ textDecoration: "none" }}
                    state={{
                      tweet: tweet,
                    }} /* 詳細ページへ値を渡す */
                  >
                    <TimeTag>{dayjs(tweet.created_at).fromNow()}</TimeTag>
                  </Link>
                </IconAndNameAndTimeBox>
                <Link
                  to={`/tweets/${tweet.id}`}
                  style={{ textDecoration: "none" }}
                  state={{
                    tweet: tweet,
                  }} /* 詳細ページへ値を渡す */
                >
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
                </Link>
              </TweetBox>
            </LinkedBox>
            <IconsBox>
              <IconAndNumber>
                <IconImage
                  src={CommentImage}
                  onClick={() => handleCommentModal(tweet)}
                />
                {tweet.comments.length > 0 && (
                  <NumberPlate>{tweet.comments.length}</NumberPlate>
                )}
              </IconAndNumber>
              <IconAndNumber>
                {
                  (retweeted = tweet.retweets.some(
                    (retweet) => retweet.user.id === userInfo.id
                  ) ? (
                    <IconImage
                      src={Retweet_done}
                      onClick={() => handleDeleteRetweet(tweet.id)}
                    />
                  ) : (
                    <IconImage
                      src={Retweet_notyet}
                      onClick={() => handleRetweet(tweet.id)}
                    />
                  ))
                }
                {tweet.retweets.length > 0 && (
                  <NumberPlate>{tweet.retweets.length}</NumberPlate>
                )}
              </IconAndNumber>
              <IconAndNumber>
                {
                  (favorite_done = tweet.favorites.some(
                    (favorite) => favorite.user.id === userInfo.id
                  ) ? (
                    <IconImage
                      src={Favorite_done}
                      onClick={() => handleDeleteFavorite(tweet.id)}
                    />
                  ) : (
                    <IconImage
                      src={Favorite_notyet}
                      onClick={() => handleFavorite(tweet.id)}
                    />
                  ))
                }
                {tweet.favorites.length > 0 && (
                  <NumberPlate>{tweet.favorites.length}</NumberPlate>
                )}
              </IconAndNumber>
              <IconImage src={NotBookmarkImage} />
            </IconsBox>
          </div>
        ))}
      <PaginationBox>
        {/* 無限レンダリングが発生するので、onClick部分はアロー関数で定義 */}
        <FirstPageButton onClick={() => describeSelectedTweet(1)}>
          最初
        </FirstPageButton>
        <PrevButton onClick={describePrevTweet}>前へ</PrevButton>
        <div>{renderPageNumbers()}</div>
        <NextButton onClick={describeNextTweet}>次へ</NextButton>
        {/* 無限レンダリングが発生するので、onClick部分はアロー関数で定義 */}
        <LastPageButton onClick={() => describeSelectedTweet(maxPages)}>
          最後
        </LastPageButton>
      </PaginationBox>
    </>
  );
};
