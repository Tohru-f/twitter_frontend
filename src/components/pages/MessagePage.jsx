import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SideBar } from "../organisms/SideBar";
import MessageIconImage from "../../assets/message.png";
import { UserSearchModal } from "../organisms/UserSearchModal";
import { axiosInstance } from "../../utils/HandleAxios";
import { saveUserDataContext } from "../providers/UserDataProvider";
import SendIconImage from "../../assets/send.png";

const MainArea = styled.div`
  background-color: black;
  color: white;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const GroupArea = styled.div`
  color: white;
  width: 30%;
  border-right: solid 1px #3b3b3b;
`;

const Header = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 0px 10px;
`;

const HeaderTitle = styled.span`
  color: white;
  font-weight: bold;
`;

const MessageButton = styled.button`
  background-color: black;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const GroupList = styled.div`
  margin: 10px 10px;
`;

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

const MessageArea = styled.div`
  color: white;
  width: 40%;
  position: relative;
  // display: flex;
  // justify-content: center;
  overflow-y: scroll;
`;

const MessageDisplayArea = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const LoginUserMessage = styled.p`
  color: white;
  background-color: #33aeff;
  border-radius: 15px 15px 2px 15px;
  width: 50%;
  margin-left: auto;
  padding: 10px 10px;
`;

const OtherUserMessage = styled.p`
  color: white;
  background-color: #3b3b3b;
  border-radius: 15px 15px 15px 2px;
  width: 50%;
  padding: 10px 10px;
`;

const MessageInputArea = styled.div`
  width: 95%;
  // height: 3%
  display: flex;
  // flex-flow: row;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #3b3b3b;
  position: sticky;
  bottom: 0;
  padding: 4px 4px 4px 4px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top 5px;
  border-top: solid 1px #3b3b3b;
`;

const MessageInputPlace = styled.input`
  color: white;
  background-color: #3b3b3b;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
`;

const SendButton = styled.button`
  background-color: #3b3b3b;
  border-radius: 50%;
  border: none;
  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

const SendImage = styled.img``;

export const MessagePage = () => {
  // ユーザー検索のモーダル開閉を管理
  const [showUserSearchModal, setShowUserSearchModal] = useState(false);
  const openUserSearchModalHandler = () => setShowUserSearchModal(true);
  const closeUserSearchModalHandler = () => setShowUserSearchModal(false);

  document.addEventListener("turbolinks:load", () => {
    function scrollToEnd() {
      const messagesDetails = document.getElementById("scroll-inner");
      messagesDetails.scrollTop = messagesDetails.scrollHeight;
    }
    scrollToEnd();
  });
  // let target = document.getElementById("scroll-inner");
  // target.scrollIntoView(false);

  // グローバルステートのログインユーザーを取得
  const { userInfo } = useContext(saveUserDataContext);

  // チャットグループのリストを管理する
  const [groupList, setGroupList] = useState([]);

  // 入力されるメッセージを管理
  const [message, setMessage] = useState("");

  // 送信済みメッセージを管理
  const [sentMessages, setSentMessages] = useState([]);

  // 選択したチャットグループのidを管理する
  const [currentGroupId, setCurrentGroupId] = useState(0);

  // 初期レンダリングでバックエンドからチャットグループを取得する
  useEffect(() => {
    const handleGroupInfo = async () => {
      const response = await axiosInstance.get("/groups");
      console.log(response.data.data.groups);
      setGroupList(response.data.data.groups);
    };
    handleGroupInfo();
  }, []);

  // 選択したチャットグループのメッセージを取得する
  const handleMoveChatGroup = async (id) => {
    setCurrentGroupId(id);
    const response = await axiosInstance.get(`/groups/${id}/messages`);
    console.log(response.data);
    setSentMessages(response.data.data.messages);
  };

  // 入力されたメッセージを更新・保存する
  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  // メッセージをバックエンド側に送信して、表示されているメッセージを最新に更新する
  const handleMessageButton = async () => {
    const response = await axiosInstance.post(
      `/groups/${currentGroupId}/messages`,
      {
        content: message,
      }
    );
    console.log(response.data);
    setMessage("");
    setSentMessages([...sentMessages, response.data.data.message]);
    console.log(sentMessages);
  };

  return (
    <MainArea>
      <SideBar />
      <GroupArea>
        <Header>
          <HeaderTitle>メッセージ</HeaderTitle>
          <MessageButton onClick={openUserSearchModalHandler}>
            <img src={MessageIconImage} />
          </MessageButton>
        </Header>
        <GroupList>
          {groupList.map((group) => (
            <UserButton
              key={group.id}
              onClick={() => handleMoveChatGroup(group.id)}
            >
              <UserIconImage
                src={
                  group.users.find((user) => user.id !== userInfo.id).icon_urls
                }
              />
              <UserNameTag>
                {group.users.find((user) => user.id !== userInfo.id).name}
              </UserNameTag>
            </UserButton>
          ))}
        </GroupList>
      </GroupArea>
      <MessageArea>
        <MessageDisplayArea>
          {sentMessages &&
            sentMessages.map((message) =>
              message.user.id === userInfo.id ? (
                <LoginUserMessage key={message.id}>
                  {message.content}
                </LoginUserMessage>
              ) : (
                <OtherUserMessage key={message.id}>
                  {message.content}
                </OtherUserMessage>
              )
            )}
        </MessageDisplayArea>
        <MessageInputArea>
          <MessageInputPlace
            placeholder="新しいメッセージを作成"
            onChange={handleMessageInput}
            value={message}
          ></MessageInputPlace>
          <SendButton onClick={handleMessageButton}>
            <SendImage src={SendIconImage} />
          </SendButton>
        </MessageInputArea>
      </MessageArea>
      <UserSearchModal
        show={showUserSearchModal}
        close={closeUserSearchModalHandler}
        move={handleMoveChatGroup}
      />
    </MainArea>
  );
};
