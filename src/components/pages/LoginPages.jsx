import React, { useState } from 'react'
import { XLogo } from '../atoms/XLogo'
import { LoginComponents } from '../organisms/LoginComponents'
import styled from 'styled-components'
import { RegistrationModal } from '../organisms/RegistrationModal'

const Pages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`

export const LoginPages = () => {

  const [show, setShow] = useState(false);
  const openModalHandler = () => setShow(true);
  const closeModalHandler = () => setShow(false);


  return (
    <Pages>
      <XLogo width="340px" height="310px" box_height="444px"/>
      <LoginComponents open={openModalHandler}/>
      <RegistrationModal show={show} close={closeModalHandler}/>
    </Pages>
  )
}
