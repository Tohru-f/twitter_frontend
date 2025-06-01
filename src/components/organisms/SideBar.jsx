import React from "react";
import styled from "styled-components";
import { HomeIcon } from "../atoms/HomeIcon";
import { NotificationIcon } from "../atoms/NotificationIcon";
import { MessageIcon } from "../atoms/MessageIcon";
import { BookmarkIcon } from "../atoms/BookmarkIcon";
import { ProfileIcon } from "../atoms/ProfileIcon";
import { PostIcon } from "../atoms/PostIcon";
import { XHomeIcon } from "../atoms/XHomeIcon";
import { SignOutIcon } from "../atoms/SignOutIcon";

const SideSpace = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 30%;
  border-right: solid 1px #3b3b3b;
`;

const SidePart = styled.div`
  width: 45%;
`;

export const SideBar = () => {
  return (
    <SideSpace>
      <SidePart>
        <XHomeIcon />
        <HomeIcon />
        <NotificationIcon />
        <MessageIcon />
        <BookmarkIcon />
        <ProfileIcon />
        <PostIcon />
        <SignOutIcon />
      </SidePart>
    </SideSpace>
  );
};
