import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImageIcon } from "../atoms/ImageIcon";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs, { locale, extend } from "dayjs";
import "dayjs/locale/ja";
import { HandleError } from "../../utils/HandleError";
import toast from "react-hot-toast";
import { HandleOffset } from "../../utils/HandleOffset";
import { HandlePagination } from "../../utils/HandlePagination";
import { Link, useLocation, useNavigate } from "react-router-dom";

// 投稿日の表示を現在の日付から「何日前」で表示する
locale("ja");
extend(relativeTime);

const LinkedBox = styled.div`
  width: 100%;
`;

const TweetBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;

const IconBox = styled.div`
  margin-left: 10px;
`;

const NameAndTimeBox = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const NameTag = styled.p`
  margin: 0px;
  font-weight: bold;
`;

const TimeTag = styled.p`
  margin: 0px 0px 0px 10px;
`;

const ContentBox = styled.div`
  width: 100%;
  margin: 0px 10px 10px 10px;
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

export const RecommendationComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalTweets, setTotalTweets] = useState(0);

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

  // 初回レンダリング時、page変更時の投稿データを取得する
  useEffect(() => {
    setCurrentPage(page);
    describeDesignatedTweet(page);
  }, [page]);

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

  return (
    <>
      {isLoading && <h2>Now Loading...</h2>}
      {!!tweets &&
        tweets.map((tweet) => (
          <LinkedBox key={tweet.id}>
            <Link
              to={`/tweets/${tweet.id}`}
              style={{ textDecoration: "none" }}
              state={{
                tweet: tweet,
              }} /* 詳細ページへ値を渡す */
            >
              <TweetBox>
                <IconBox>
                  <ImageIcon />
                </IconBox>
                <ContentBox>
                  <NameAndTimeBox>
                    {/* <p>{tweet.user.name}</p> */}
                    <NameTag>名無しの権兵衛</NameTag>{" "}
                    <TimeTag>{dayjs(tweet.created_at).fromNow()}</TimeTag>
                    {/* プロフィール実装までの仮 */}
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
              </TweetBox>
            </Link>
          </LinkedBox>
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
