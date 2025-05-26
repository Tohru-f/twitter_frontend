import React from 'react'
import { Google_button } from '../atoms/google_button'
import { Apple_button } from '../atoms/Apple_button'
import { Account_making } from '../atoms/Account_making'
import { Explanation_agreement } from '../atoms/Explanation_agreement'
import { Login_button } from '../atoms/Login_button'
import styled from 'styled-components'
import { Or } from "../atoms/Or"

const Components = styled.div`
  display: flex;
  flex-flow: column;
  width: 50%;
`

const Specialized_h1 = styled.h1`
  width: 100%;
  color: white;
  font-size: 64px;
`

const Specialized_h2 = styled.h2`
  width: 400px;
  height: 70px;
  color: white;
  font-size: 31px;
  margin-bottom: 0px;
`

const Specialized_h3 = styled.h3`
  width: 300px;
  height: 20px;
  color: white;
`

export const Login_components = ({open}) => {


  return (
    <Components>
      <Specialized_h1>すべての話題が、ここに。</Specialized_h1>
      <Specialized_h2>今すぐ参加しましょう。</Specialized_h2>
      <Google_button />
      <Apple_button />
      <Or />
      <Account_making open={open} />
      <Explanation_agreement/>
      <br />
      <Specialized_h3>アカウントをお持ちの場合</Specialized_h3>
      <Login_button/>
    </Components>
  )
}
