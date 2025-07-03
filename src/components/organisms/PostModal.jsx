import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PostIcon } from "../atoms/PostIcon";
import Animated_ryoma from "../../assets/Animated_ryoma.jpeg";
import { SeparateLine } from "../atoms/SeparateLine";
import ImageMode from "../../assets/image_mode.png";
import { handleTweet } from "../../utils/HandleTweet";
import { HandlePreview } from "../../utils/HandlePreview";

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 2rem;
  border-radius: 15px;
  min-width: 500px;
  height: auto + calc + ${(props) => props.$attachedimageheight || 0}px;
  display: flex;
  flex-flow: column;
  padding-top: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(91, 112, 131, 0.4);
`;

const TweetModalBox = styled.div`
  width: 80%
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  border-radius: 50%;
`;

const InputPlace = styled.input`
  background-color: black;
  width: calc(100% - 60px);
  margin-left: 10px;
  color: white;
  font-size: 20px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const PostBox = styled.div`
  display: flex;
  align-items: center;
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

export const PostModal = ({ show, close }) => {
  const [tweetContent, setTweetContent] = useState("");
  // ツイートに関連づけるための画像を扱う
  const [tweetImage, setTweetImage] = useState([]);
  // 投稿欄(モーダル)に表示させるプレビュー用の画像を扱う
  const [imagePreview, setImagePreview] = useState([]);
  // プレビュー画像が表示される時に投稿欄コンポーネントの高さを調整するために使用
  const [attachedImageHeight, setAttachedImageHeight] = useState(0);
  // 画像選択ボタンから参照させるために使用
  const fileInputRef = useRef(null);

  // 画像が選択された時点でフォームの高さを調整したいので、画像の高さを取得してCSSに反映
  const onImageLoad = (e) => {
    setAttachedImageHeight(e.target.height);
  };

  // 投稿ボタンが押された時の処理。画像処理後に投稿処理となる。
  const handlePostClick = async () => {
    handleTweet({
      tweetContent,
      tweetImage,
      setTweetContent,
      setTweetImage,
      setImagePreview,
      close,
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
    // prevにはimagePreviewのstate変数が入る。_は慣習的に使わない引数に対して使用する
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    // showがtrue且つ、押下されたキーがEscapeボタンの場合に実行される
    const onKeyDownEsc = (event) => {
      if (show && event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    // window全体にイベントリスナーを追加
    window.addEventListener("keydown", onKeyDownEsc);
    // useEffectの再実行やアンマウント時に前回のイベントリスナーを削除
    return () => window.removeEventListener("keydown", onKeyDownEsc);
  }, [show, close]);

  if (!show) return <></>;
  return (
    <>
      <Overlay onClick={close}></Overlay>
      <Modal $attachedimageheight={attachedImageHeight}>
        <TweetModalBox>
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
        </TweetModalBox>
        <PreviewBox>
          {!!imagePreview &&
            // imagePreviewにプレビュー画像用のデータURLが格納される
            // map関数で=> () アロー関数を使うことで要素をreturnしていることで表示できる
            imagePreview.map((preview, idx) => (
              <output key={idx}>
                <img
                  src={preview}
                  alt="画像プレビュー"
                  width="30%"
                  height="30%"
                  onLoad={onImageLoad}
                  onClick={() => handleImageClick(idx)}
                />
              </output>
            ))}
        </PreviewBox>
        <SeparateLine />
        <PostBox>
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
        </PostBox>
      </Modal>
    </>
  );
};
