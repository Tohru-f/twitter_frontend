import axios from "axios";
import React from "react";

export const axiosInstance = axios.create({
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // トークン情報をローカルストレージから取得しておく
    const access_token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
    if (access_token && client && uid) {
      config.headers["access-token"] = access_token;
      config.headers["client"] = client;
      config.headers["uid"] = uid;
    }
    return config;
  },
  (error) => {
    // リクエストエラーが発生した場合の処理
    return Promise.reject(error);
  }
);
