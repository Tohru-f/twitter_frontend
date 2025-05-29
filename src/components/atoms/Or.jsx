import React from 'react'
import styled from 'styled-components'

const Or_space = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 300px;
  height: 40px;
  text-align: center;
  &:before, &:after  {
    content: "";
    flex-grow: 1;
    height: 1px;
    background: #3B3B3B;
    margin: 0 0.25em;
  }
`

export const Or = () => {


  return (
    <Or_space>
      または
    </Or_space>
  )
}
