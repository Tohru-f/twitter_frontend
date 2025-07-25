import React from "react";
import { axiosInstance } from "./HandleAxios";

export const HandleOffset = async ({
  setIsLoading,
  newOffset,
  setTweets,
  setTotalTweets,
}) => {
  const query = new URLSearchParams({ limit: 10, offset: newOffset });
  setIsLoading(true);
  const response = await axiosInstance.get(`/tweets?${query.toString()}`);
  setTweets(response.data.data.tweets);
  setTotalTweets(response.data.data.count);
  setIsLoading(false);
};
