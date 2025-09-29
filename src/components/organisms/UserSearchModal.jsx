import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/search.png";
import { axiosInstance } from "../../utils/HandleAxios";

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 2rem;
  border-radius: 15px;
  min-width: 50%;
  max-height: 80%;
  min-height: 50%;
  padding-top: 10px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
    border-radius: 100px;
    border: 1px solid #3b3b3b;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3b3b3b;
    border-radius: 100px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(91, 112, 131, 0.4);
`;

const Header = styled.div`
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CloseButton = styled.button`
  color: white;
  border: none;
  background-color: black;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.span`
  color: white;
  font-weight: bold;
`;

const NextButton = styled.button`
  border: none;
  background-color: white;
  color: black;
  border-radius: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  border-bottom: 1px solid #3b3b3b;
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const SearchImage = styled.img``;

const SearchPlace = styled.input`
  color: white;
  background-color: black;
  outline: none;
  border: none;
  width: 95%;
  margin-left: 10px;
`;

const SelectedUserListSpace = styled.div`
  display: flex;
`;

const UserListSpace = styled.div``;

const UserButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const UserIconImage = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

const UserNameTag = styled.span`
  color: white;
`;

const DeleteTag = styled.button`
  background-color: black;
  color: white;
  border: none;
  outline: none;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const DummyMessage = styled.p`
  color: white;
`;

export const UserSearchModal = ({ show, close, move }) => {
  // 検索したユーザーデータを格納するリスト
  const [userList, setUserList] = useState([]);

  // 選択したユーザーデータを格納するリスト
  const [selectedUserList, setSelectedUserList] = useState([]);

  // 入力された文字に応じてユーザーデータを検索する
  const handleUserSearch = async (e) => {
    const response = await axiosInstance.get("/users/search", {
      params: { name: e.target.value },
    });
    if (response.data.data.users.length > 0) {
      console.log(response.data.data.users);
      setUserList(response.data.data.users);
    }
  };

  // 選択したユーザーをメッセージ送信相手の候補に設定する
  const handleSelectUser = (user) => {
    setSelectedUserList([...selectedUserList, user]);
    setUserList([]);
  };

  // prevにはselectedUserListのstate変数が入る。選択したユーザーを削除
  const handleSelectedUserDelete = (id) => {
    setSelectedUserList((prev) => prev.filter((user) => user.id !== id));
  };

  // 指定したユーザーとのメッセージグループを作成する
  const handleMakeGroup = async () => {
    if (selectedUserList.length === 0) {
      console.log("ユーザーを選択してください。");
      return;
    }
    const response = await axiosInstance.post("/groups", {
      user_id: selectedUserList[0].id,
    });
    console.log(response.data);
    if (response.data.message === "Requested group already exists") {
      move(response.data.data.group[0].id);
    }
    close();
  };

  useEffect(() => {
    // showがtrue且つ、押下されたキーがEscapeボタンの場合に実行される
    const onKeyDownEsc = (event) => {
      if (show && event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    // window全体にイベントリスナーを追加
    window.addEventListener("keydown", onKeyDownEsc);
    // useEffectの再実行やアンマウント時に前回のイベントリスナーを削除
    return () => window.removeEventListener("keydown", onKeyDownEsc);
  }, [show, close]);

  if (!show) return <></>;
  return (
    <>
      <Overlay onClick={close}></Overlay>
      <Modal>
        <Header>
          <CloseButton onClick={close}>✖︎</CloseButton>
          <HeaderTitle>新しいメッセージ</HeaderTitle>
          <NextButton onClick={handleMakeGroup}>次へ</NextButton>
        </Header>
        <SearchBar>
          <SearchImage src={SearchIcon} />
          <SearchPlace
            placeholder="ユーザーを検索"
            onChange={handleUserSearch}
          ></SearchPlace>
        </SearchBar>
        <SelectedUserListSpace>
          {selectedUserList && selectedUserList.length > 0 ? (
            selectedUserList.map((user) => (
              <UserButton key={user.id}>
                <UserIconImage src={user.icon_urls} />
                <UserNameTag>{user.name}</UserNameTag>
                <DeleteTag onClick={() => handleSelectedUserDelete(user.id)}>
                  ✖︎
                </DeleteTag>
              </UserButton>
            ))
          ) : (
            <DummyMessage>
              メッセージを送るユーザーを選択してください
            </DummyMessage>
          )}
        </SelectedUserListSpace>
        <UserListSpace>
          {userList && userList.length > 0 ? (
            userList.map((user) => (
              <UserButton key={user.id} onClick={() => handleSelectUser(user)}>
                <UserIconImage src={user.icon_urls} />
                <UserNameTag>{user.name}</UserNameTag>
              </UserButton>
            ))
          ) : (
            <DummyMessage>ユーザーを検索してください</DummyMessage>
          )}
        </UserListSpace>
      </Modal>
    </>
  );
};
