import dayjs from "dayjs";
import { Popover } from "radix-ui";
import React from "react";
import styled from "styled-components";

const LoadingTag = styled.h2`
  color: white;
`;

const CommentBox = styled.div`
  color: white;
`;

const ProfileBox = styled.div`
  display: flex;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
`;

const NameTag = styled.p`
  color: white;
  margin-top: 0px;
  margin-left: 5px;
  font-weight: bold;
`;

const TimeTag = styled.p`
  color: #787878;
  margin-top: 0px;
  margin-left: 10px;
`;

const CommentTag = styled.p`
  color: white;
  margin-top: 0px;
  margin-left: 55px;
`;

export const CommentComponent = ({ userComments, isLoading, show, open }) => {
  if (userComments.length === 0 || isLoading)
    return <LoadingTag>Now Loading...</LoadingTag>;
  return (
    <>
      {userComments.map((comment) => (
        <CommentBox key={comment.id}>
          <ProfileBox>
            <ProfileIcon src={comment.user.icon_urls} />
            <NameTag>{comment.user.name}</NameTag>
            <TimeTag>
              {dayjs(comment.created_at).format("YYYY年MM月DD日")}
            </TimeTag>
            <Popover.Root>
              <Popover.Trigger
                className="PopoverTrigger"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  margin: 0,
                  border: "none",
                }}
              >
                ...
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="PopoverContent"
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  onClick={() => open(comment.id)}
                >
                  削除
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </ProfileBox>
          <CommentTag>{comment.content}</CommentTag>
        </CommentBox>
      ))}
    </>
  );
};
