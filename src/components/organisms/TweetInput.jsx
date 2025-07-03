import React, { useEffect, useRef, useState } from "react";
import Animated_ryoma from "../../assets/Animated_ryoma.jpeg";
import styled from "styled-components";
import ImageMode from "../../assets/image_mode.png";
import { PostIcon } from "../atoms/PostIcon";
import toast, { Toaster } from "react-hot-toast";
import { handleTweet } from "../../utils/HandleTweet";
import { HandlePreview } from "../../utils/HandlePreview";

const TweetSpace = styled.div`
  border-top: solid 1px #3b3b3b;
  border-bottom: solid 1px #3b3b3b;
  width: 100%;
  // propsとして受け取ったプレビュー画像の高さを足すことで全体の高さを調整
  height: calc(175px + ${(props) => props.$attachedimageheight || 0}px);
  padding: 15px 15px 15px 15px;
`;

const PairBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  border-radius: 50%;
`;

const InputPlace = styled.input`
  background-color: black;
  width: calc(100% - 30px);
  color: white;
  font-size: 20px;
  border: none;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const UnderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
`;

const ImageUploadSet = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageButton = styled.button`
  height: 24px;
  width: 24px;
  background-color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 20%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 1;
`;

const DummyImage = styled.img`
  position: absolute;
  top: 50%;
  left: 20%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const PreviewBox = styled.div`
  display: flex;
`;

export const TweetInput = () => {
  const [tweetContent, setTweetContent] = useState("");
  // ツイートに関連づけるための画像を扱う
  const [tweetImage, setTweetImage] = useState([]);
  // 投稿欄に表示させるプレビュー用の画像を扱う
  const [imagePreview, setImagePreview] = useState([]);
  // プレビュー画像が表示される時に投稿欄コンポーネントの高さを調整するために使用
  const [attachedImageHeight, setAttachedImageHeight] = useState(0);
  // 画像選択ボタンから参照させるために使用
  const fileInputRef = useRef(null);

  // 画像が選択された時点でフォームの高さを調整したいので、画像の高さを取得してCSSに反映
  const onImageLoad = (e) => {
    setAttachedImageHeight(e.target.height);
  };

  const handlePostClick = (e) => {
    console.log(tweetContent);
    handleTweet({
      tweetContent,
      tweetImage,
      setTweetContent,
      setTweetImage,
      setImagePreview,
      e,
    });
  };

  // 投稿欄の入力文字を保管
  const handleTweetChange = (e) => {
    setTweetContent(e.target.value);
  };

  // inputで選択された画像ファイルをプレビュー画像として表示する
  const handleChangePostImage = (e) => {
    // 選択された画像ファイルが入る。？でe.targetが存在しない場合にエラーを防ぐ
    const uploadedFiles = e.target?.files;
    HandlePreview({
      uploadedFiles,
      tweetImage,
      imagePreview,
      setImagePreview,
      setTweetImage,
      e,
    });
  };

  const handleImageClick = (index) => {
    // prevにはimagePreviewのstate変数が入る。_は慣習的に使わない引数に対して使用する。選択した画像を削除
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    // attachedImageHeightはプレビュー画像の高さ
    <TweetSpace $attachedimageheight={attachedImageHeight}>
      <PairBox>
        <Image
          src={Animated_ryoma}
          alt="animated_ryoma"
          width="40px"
          height="40px;"
        />
        <InputPlace
          type="text"
          placeholder="いまどうしてる？"
          value={tweetContent}
          onChange={handleTweetChange}
        />
      </PairBox>
      <PreviewBox>
        {!!imagePreview &&
          // imagePreviewにプレビュー画像用のデータURLが格納される
          // map関数で=> () アロー関数を使うことで要素をreturnしている。returnしないと表示されない
          imagePreview.map((preview, idx) => (
            <output key={idx}>
              <img
                src={preview} // Data URLが入ることにより画像が表示される
                alt="画像プレビュー"
                width="50%"
                height="50%"
                onLoad={onImageLoad}
                onClick={() => handleImageClick(idx)}
              />
            </output>
          ))}
      </PreviewBox>
      <UnderBox>
        <ImageUploadSet>
          <ImageButton
            onClick={() =>
              // inputタグを参照しており、このボタンをクリックするとinputタグをクリックしたことになる。!!は値を真偽値に変換
              !!fileInputRef.current && fileInputRef.current.click()
            }
          />
          <input
            type="file" // これによりファイル選択のウィンドウが表示される
            accept="image/*"
            hidden
            multiple
            ref={fileInputRef} // ImageButtonコンポーネントから参照されている。
            onChange={handleChangePostImage}
          />
          <DummyImage src={ImageMode} />
        </ImageUploadSet>
        <PostIcon
          width="120px"
          margin-bottom="0px"
          handlePostClick={handlePostClick}
        />
        <Toaster position="top-center" />
      </UnderBox>
    </TweetSpace>
  );
};
