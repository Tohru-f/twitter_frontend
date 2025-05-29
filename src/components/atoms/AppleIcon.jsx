import React from 'react'
import styled from 'styled-components'
import Apple_icon from "../../assets/apple_icon.png"

const Button = styled.button`
  background-color: white;
  border-radius: 20px;
  width: 300px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  cursor: pointer;
  &: hover {
  background-color: #E1E3E1;
`

export function AppleIcon() {


  return (
    <Button>
      <img src={Apple_icon} alt="apple_icon" />
      Appleのアカウントで登録
    </Button>
  )
}
