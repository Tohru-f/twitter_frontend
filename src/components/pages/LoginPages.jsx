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
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const openSignUpModalHandler = () => setShowSignUpModal(true);
  const closeSignUpModalHandler = () => setShowSignUpModal(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModalHandler = () => setShowLoginModal(true);
  const closeModalHandler = () => setShowLoginModal(false);

  return (
    <Pages>
      <XLogo width="340px" height="310px" box_height="444px" />
      <LoginComponents
        openSignUp={openSignUpModalHandler}
        openLogin={openLoginModalHandler}
      />
      <RegistrationModal
        show={showSignUpModal}
        close={closeSignUpModalHandler}
      />
      <LoginModal show={showLoginModal} close={closeModalHandler} />
    </Pages>
  );
};
