import React from "react";
import styled from "styled-components";

const LikeTag = styled.p`
  color: white;
`;

export const LikeComponent = () => {
  return (
    <div>
      <LikeTag>いいねをつけた投稿</LikeTag>
    </div>
  );
};
