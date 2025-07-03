import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 50%;
  height: 50px;
  background-color: black;
  border: none;
  color: #737373;
  font-weight: bold;
  &:hover {
    background-color: #1b1b1b;
    cursor: pointer;
  }
  // .activeとすることでReactのstate変数によって管理できる。
  // :activeにするとクリックした瞬間だけ適用される
  &.active {
    color: white;
  }
`;

export const TweetTabs = ({ activeTab, onTabClick }) => {
  return (
    <div>
      <Button
        // 表示のタブの切り替え
        onClick={() => onTabClick("recommendation")}
        className={activeTab === "recommendation" ? "active" : ""}
      >
        おすすめ
      </Button>
      <Button
        // 表示のタブの切り替え
        onClick={() => onTabClick("follow")}
        className={activeTab === "follow" ? "active" : ""}
      >
        フォロー中
      </Button>
    </div>
  );
};
