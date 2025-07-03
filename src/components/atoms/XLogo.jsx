import React from "react";
import styled from "styled-components";
import XLogoImage from "../../assets/logo-white.png";

const Image = styled.div`
  width: 50%;
  height: ${(props) => props.box_height};
  padding: 0 32px 32px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const XLogo = ({ width, height, box_height }) => {
  return (
    <Image>
      <img src={XLogoImage} alt="x_logo" width={width} height={height} />
    </Image>
  );
};
