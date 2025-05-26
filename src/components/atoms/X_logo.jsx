import React from 'react';
import styled from 'styled-components';
import X_logo_image from "../../assets/logo-white.png";

const Image = styled.div`
  width: 50%;
  height: ${props => props.box_height};
  padding: 0 32px 32px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const X_logo = ({width, height, box_height}) => {

  return (
    <Image>
      <img src={X_logo_image} alt="x_logo" width={width} height={height}/>
    </Image>
    
  )
}
