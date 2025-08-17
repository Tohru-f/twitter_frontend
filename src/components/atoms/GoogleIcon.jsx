import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import GoogleIconImage from "../../assets/google_icon.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveUserDataContext } from "../providers/UserDataProvider";
import { axiosInstance } from "../../utils/HandleAxios";

const Button = styled.button`
  background-color: white;
  border-radius: 20px;
  width: 300px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &: hover {
    background-color: #e1e3e1;
  }
`;

export function GoogleIcon() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // グローバルステートのログインユーザーを取得
  const { userInfo, setUserInfo } = useContext(saveUserDataContext);

  const handleGoogleLogin = () => {
    // googleの認証画面へ遷移して認証を行う
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/api/v1/auth/google_oauth2`;
  };

  // useEffectでsearchParamsが変わった時に処理を始動させる
  useEffect(() => {
    const LoginAndGetUserInfo = async () => {
      // 取得するparamsの中にaccess-tokenが含まれている場合に始動
      if (searchParams.has("access-token")) {
        // URLのパラメーターからトークン情報を取得
        const access_token = searchParams.get("access-token");
        const client = searchParams.get("client");
        const uid = searchParams.get("uid");

        // ローカルストレージにトークン情報を保管
        localStorage.setItem("access-token", access_token);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);

        // ログインユーザーの情報をグローバルステートに保管
        const response = await axiosInstance.get("/users");
        setUserInfo(response.data.data.user);

        // ログイン後のメインページへ遷移
        navigate("/main");
      }
    };
    LoginAndGetUserInfo();
  }, [searchParams]);

  return (
    <Button onClick={handleGoogleLogin}>
      <img src={GoogleIconImage} alt="google_icon" width={24} height={24} />
      Google で登録
    </Button>
  );
}
