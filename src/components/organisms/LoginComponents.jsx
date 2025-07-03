import React from "react";
import { GoogleIcon } from "../atoms/GoogleIcon";
import { AppleIcon } from "../atoms/AppleIcon";
import { AccountMaking } from "../atoms/AccountMaking";
import { ExplanationAgreement } from "../atoms/ExplanationAgreement";
import { LoginIcon } from "../atoms/LoginIcon";
import styled from "styled-components";
import { Or } from "../atoms/Or";

const Components = styled.div`
  display: flex;
  flex-flow: column;
  width: 50%;
`;

const Specialized_h1 = styled.h1`
  width: 100%;
  color: white;
  font-size: 64px;
`;

const Specialized_h2 = styled.h2`
  width: 400px;
  height: 70px;
  color: white;
  font-size: 31px;
  margin-bottom: 0px;
`;

const Specialized_h3 = styled.h3`
  width: 300px;
  height: 20px;
  color: white;
`;

export const LoginComponents = ({ openSignUp, openLogin }) => {
  return (
    <Components>
      <Specialized_h1>すべての話題が、ここに。</Specialized_h1>
      <Specialized_h2>今すぐ参加しましょう。</Specialized_h2>
      <GoogleIcon />
      <AppleIcon />
      <Or />
      <AccountMaking open={openSignUp} />
      <ExplanationAgreement />
      <br />
      <Specialized_h3>アカウントをお持ちの場合</Specialized_h3>
      <LoginIcon open={openLogin} />
    </Components>
  );
};
