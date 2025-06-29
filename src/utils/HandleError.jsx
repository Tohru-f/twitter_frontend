import React from "react";
import toast from "react-hot-toast";

export const HandleError = (error) => {
  // ネットワーク/APIエラーの処理
  if (error.response) {
    const status = error.response.status;

    const userFriendlyMessages = {
      400: "リクエストが不正です。",
      401: "ログインが必要です。",
      403: "アクセス権限がありません。",
      404: "リソースが見つかりません。",
      422: error.response.data.data || "入力内容に誤りがあります。",
      500: "サーバーエラーが発生しました。",
    };

    toast.error(
      userFriendlyMessages[status] || `エラーが発生しました。(コード：${status}`
    );
    console.error(error.response);
  } else {
    // クライアントサイドエラーの処理
    const errorType = error.constructor.name;

    const clientErrors = {
      TypeError: "データ処理中にエラーが発生しました。",
      SyntaxError: "システム内部エラーが発生しました。",
      RangeError: "数値処理エラーが発生しました。",
      ReferenceError: "システム内部エラーが発生しました。",
      EvalError: "スクリプト実行エラーが発生しました。",
      InternalError: "システム内部エラーが発生しました。",
    };

    toast.error(clientErrors[errorType] || "予期せぬエラーが発生しました。");

    console.error(`[${errorType}] ${error.message}`);
  }
};
