import React from "react";
import styled from "styled-components";
import Animated_ryoma from "../../assets/Animated_ryoma.jpeg";

const Image = styled.img`
  border-radius: 50%;
`;

export const ImageIcon = ({ width, height, style }) => {
  return (
    <Image
      src={Animated_ryoma}
      alt="animated_ryoma"
      width={width}
      height={height}
      style={style}
    />
  );
};
