import React from "react";
import { axiosInstance } from "./HandleAxios";
import { HandleError } from "./HandleError";
import toast from "react-hot-toast";

// 投稿ボタンが押された時の処理。画像処理後に投稿処理となる。
export const handleTweet = async ({
  tweetContent,
  tweetImage,
  setTweetContent,
  setTweetImage,
  setImagePreview,
  e,
  ...rest // closeはモーダル側でのみ使用するため、restという名前のオブジェクトとして受け取る
}) => {
  try {
    console.log(tweetContent);
    // 投稿欄が空でなければ画像のidと投稿文をAPI側へ送信する。空の場合はユーザーに知らせて終了
    if (tweetContent !== "") {
      // 画像ファイルを送る場合、FormDataに格納する必要がある
      const formData = new FormData();
      // 複数の画像に対応するためにimageIdを配列で管理する。他の関数から参照できるようにtry内で最上階で宣言
      const imageId = [];
      // !!でtweetImageを真偽値に変換
      if (!!tweetImage) {
        tweetImage.forEach((file) => {
          // 明示的にfiles[]とすることで、API側のparams[:files]を配列データとする
          formData.append("files[]", file);
        });
        // 画像ファイルをAPi側のcontrollerに送信
        if (tweetImage.length > 0) {
          const imageResponse = await axiosInstance.post("/images", formData);
          console.log(imageResponse.data);
          // API側から受け取った画像ファイルのblobsのハッシュデータからidを取得して画像idとして追加する
          for (let res of imageResponse.data.blobs) {
            imageId.push(res.id);
          }
        }
      }
      console.log(...formData.entries());
      console.log(tweetImage);
      const response = await axiosInstance.post("/tweets", {
        tweet: { content: tweetContent, image_ids: imageId },
      });
      console.log(response.data);
      // 投稿が成功したら投稿欄、state変数の画像とプレビュー画像を初期化する
      if (response.status === 200) {
        console.log("Tweeted successfully!");
        setTweetContent("");
        setTweetImage([]);
        setImagePreview([]);
        if (rest.close) {
          rest.close();
        }
      }
    } else {
      toast.error("空での投稿はできません。");
      return;
    }
  } catch (error) {
    HandleError(error);
  }
};
