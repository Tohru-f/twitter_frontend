import React from "react";
import { axiosInstance } from "./HandleAxios";

export const HandleOffset = async ({
  setIsLoading,
  setCurrentOffset,
  newOffset,
  setTweets,
}) => {
  setIsLoading(true);
  setCurrentOffset(newOffset);
  const response = await axiosInstance.get(
    `/tweets?limit=10&offset=${newOffset}`
  );
  setTweets(response.data.data.tweets);
  setIsLoading(false);
};
