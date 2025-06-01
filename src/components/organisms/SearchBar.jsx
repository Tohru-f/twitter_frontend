import React from "react";
import styled from "styled-components";

const SearchSide = styled.div`
  width: 35%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: solid 1px #3b3b3b;
`;

const SearchPart = styled.div`
  width: 60%;
  color: white;
`;

export const SearchBar = () => {
  return (
    <SearchSide>
      <SearchPart>検索バー</SearchPart>
    </SearchSide>
  );
};
