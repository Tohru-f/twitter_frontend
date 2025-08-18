import React from "react";
import styled from "styled-components";

const CommentBackTag = styled.p`
  color: white;
`;

export const CommentBackComponent = () => {
  return (
    <div>
      <CommentBackTag>コメント付きの場合</CommentBackTag>
    </div>
  );
};
