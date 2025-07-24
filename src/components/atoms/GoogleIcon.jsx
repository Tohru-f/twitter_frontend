import React, { useEffect } from "react";
import styled from "styled-components";
import GoogleIconImage from "../../assets/google_icon.png";
import { useNavigate, useSearchParams } from "react-router-dom";

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

  const handleGoogleLogin = () => {
    // googleの認証画面へ遷移して認証を行う
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/api/v1/users/google_oauth2`;
  };

  // useEffectでsearchParamsが変わった時に処理を始動させる
  useEffect(() => {
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

      // ログイン後のメインページへ遷移
      navigate("/main?page=1");
    }
  }, [searchParams]);

  return (
    <Button onClick={handleGoogleLogin}>
      <img src={GoogleIconImage} alt="google_ico" width={24} height={24} />
      Google で登録
    </Button>
  );
}
