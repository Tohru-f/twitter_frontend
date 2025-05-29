import React from 'react'
import styled from 'styled-components'

const Tag = styled.div`
  color: #7F7F81;
  width: 300px;
  height: 40px;
  font-size: 11.25px;
  margin-top: 10px
`

export const ExplanationAgreement = () => {


  return (
    <Tag>
      アカウントを登録することにより、利用規約とプライバシーボリシー(Cookieの使用を含む)に同意したとみなされます。
    </Tag>
  )
}

