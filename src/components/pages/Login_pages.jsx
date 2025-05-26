import React, { useState } from 'react'
import { X_logo } from '../atoms/X_logo'
import { Login_components } from '../organisms/Login_components'
import styled from 'styled-components'
import { Registration_modal } from '../organisms/Registration_modal'

const Pages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`

export const Login_pages = () => {

  const [show, setShow] = useState(false);
  const openModalHandler = () => setShow(true);
  const closeModalHandler = () => setShow(false);


  return (
    <Pages>
      <X_logo width="340px" height="310px" box_height="444px"/>
      <Login_components open={openModalHandler}/>
      <Registration_modal show={show} close={closeModalHandler}/>
    </Pages>
  )
}
