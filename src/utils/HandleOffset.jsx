import React from "react";
import { axiosInstance } from "./HandleAxios";

export const HandleOffset = async ({
  setIsLoading,
  setCurrentOffset,
  newOffset,
  setTweets,
}) => {
  const query = new URLSearchParams({ limit: 10, offset: newOffset });
  setIsLoading(true);
  setCurrentOffset(newOffset);
  const response = await axiosInstance.get(`/tweets?${query.toString()}`);
  setTweets(response.data.data.tweets);
  setIsLoading(false);
};
