import React from 'react'
import styled from 'styled-components'
import Google_icon from "../../assets/google_icon.png";

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
  background-color: #E1E3E1;
  }
`

export function Google_button() {


  return (
    <Button>
      <img src={Google_icon} alt="google_ico" width="24px" height="24px" />
      Google で登録
    </Button>
  )
}

