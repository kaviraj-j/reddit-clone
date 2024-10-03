"use client";

import axios from "axios";
import { NewSubredditPayload } from "./data-types";
import { subredditUrl } from "@/config/api";

export const createSubreddit = async (
  subreddiDetails: NewSubredditPayload,
  token: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios
    .post(
      subredditUrl.new,
      {
        ...subreddiDetails,
      },
      { headers }
    )
    .then((res) => res.data);
};

export const getFollwedSubreddits = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios.get(subredditUrl.follwedSubReddits, { headers }).then((res) => res.data);
};
