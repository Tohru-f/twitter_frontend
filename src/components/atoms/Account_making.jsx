import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #3BA3FF;
  width: 300px;
  border-radius: 20px;
  color: white;
  height: 40px;
  text-align: center;
  border: none;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  &: hover {
  background-color: #3496D8;
`

export function Account_making({open}) {


  return (
    <Button onClick={open}>
      アカウントを作成
    </Button>
  )
}
