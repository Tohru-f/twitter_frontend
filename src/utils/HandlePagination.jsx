import React from "react";
import styled from "styled-components";

const CurrentPageNumber = styled.span`
  font-weight: bold;
`;

const DesignatedButton = styled.button`
  background-color: white;
  border-radius: 5px;
`;

export const HandlePagination = ({
  i,
  describeDesignatedTweet,
  pageNumbers,
  currentPage,
}) => {
  pageNumbers.push(
    currentPage === i ? (
      <CurrentPageNumber key={i} id="current-page">
        {i}
      </CurrentPageNumber>
    ) : (
      // 無限レンダリングが発生するので、onClick部分はアロー関数で定義
      <DesignatedButton key={i} onClick={() => describeDesignatedTweet(i)}>
        {i}
      </DesignatedButton>
    )
  );
};
