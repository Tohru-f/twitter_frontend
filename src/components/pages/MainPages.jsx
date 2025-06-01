import React from "react";
import styled from "styled-components";
import { SideBar } from "../organisms/SideBar";
import { TweetView } from "../organisms/TweetView";
import { SearchBar } from "../organisms/SearchBar";

const MainSpace = styled.div`
  background-color: black;
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const MainPages = () => {
  return (
    <MainSpace>
      <SideBar />
      <TweetView />
      <SearchBar />
    </MainSpace>
  );
};
