import { postUrl } from "@/config/api";
import axios from "axios";
import { NewPost, Post } from "./data-types";

interface PostFilter {
  subredditName?: string;
  userId?: string;
}

export const getPosts = async (token: string, filter: PostFilter) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios
    .get(
      `${postUrl.getPosts}?subredditName=${filter.subredditName ?? ""}&userId=${
        filter.userId ?? ""
      }`,
      { headers }
    )
    .then((res) => res.data);
};

export const createPost = async (token: string, post: NewPost) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(postUrl.newPost, post, { headers });
    return { response, type: "success" };
  } catch (error) {
    console;
    return { type: "error" };
  }
};

export const getPostDetails = async (token: string, postId: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${postUrl.getPostDetails}/${postId}`, {
      headers,
    });
    return { response, type: "success" };
  } catch (error) {
    console;
    return { type: "error" };
  }
};

export const getPostComments = async (token: string, postId: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${postUrl.getPostDetails}?postId=${postId}`, {
      headers,
    });
    return { response, type: "success" };
  } catch (error) {
    console;
    return { type: "error" };
  }
};
