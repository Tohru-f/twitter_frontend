import React, { useState } from "react";
import { XLogo } from "../atoms/XLogo";
import { LoginComponents } from "../organisms/LoginComponents";
import styled from "styled-components";
import { RegistrationModal } from "../organisms/RegistrationModal";
import { LoginModal } from "../organisms/LoginModal";

const Pages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const LoginPages = () => {
  const [showRegModal, setShowRegModal] = useState(false);
  const openRegModalHandler = () => setShowRegModal(true);
  const closeRegModalHandler = () => setShowRegModal(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModalHandler = () => setShowLoginModal(true);
  const closeModalHandler = () => setShowLoginModal(false);

  return (
    <Pages>
      <XLogo width="340px" height="310px" box_height="444px" />
      <LoginComponents
        openReg={openRegModalHandler}
        openLogin={openLoginModalHandler}
      />
      <RegistrationModal show={showRegModal} close={closeRegModalHandler} />
      <LoginModal show={showLoginModal} close={closeModalHandler} />
    </Pages>
  );
};
