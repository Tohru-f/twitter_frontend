import React from "react";

export const HandlePreview = ({
  uploadedFiles,
  tweetImage,
  imagePreview,
  setImagePreview,
  setTweetImage,
  e,
}) => {
  // 何も選択されなかったら処理中断
  // ?を付けることでe.target.filesがnull/undefinedの場合はundefinedを返し、エラーを回避する
  if (uploadedFiles.length === 0) {
    return;
  }

  // ファイルが画像でなかったら処理中断
  // ?を付けることでe.target.filesがnull/undefinedの場合はundefinedを返し、エラーを回避する
  if (!uploadedFiles[0].type.match("image.*")) {
    return;
  }

  // 画像ファイルはFileListオブジェクト(配列のようなもの)なので配列データに変換する
  const filesArray = Array.from(uploadedFiles);
  const readers = filesArray.map((file) => {
    return new Promise((resolve) => {
      // FileReader1つに対して1つのファイルしか入れられない。
      const reader = new FileReader(); // ファイル内容をメモリに読み込むAPI
      reader.onload = (e) => resolve(e.target.result); // 読み込み完了時に発火し、結果をe.target.resultで取得
      reader.readAsDataURL(file); // ファイルをData URL形式で非同期読み込み。画像表示にはData URL形式が必要
    });
  });

  // readersに格納されたPromiseオブジェクトの配列を全て読み込む
  // Data URL配列をimagePreview変数に保管する
  Promise.all(readers).then((results) => {
    setImagePreview(results);
  });
  console.log(imagePreview);

  // FileListオブジェクト(配列のようなもの)をArray.fromで配列に変換する。選択した画像がe.target.filesに入る
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    // スプレッド構文でフラットな配列を生成する。既存の画像に選択した画像を追加する。画像投稿の前準備
    setTweetImage([...tweetImage, ...files]);
  }
};
