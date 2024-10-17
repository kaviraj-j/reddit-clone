import { postUrl } from "@/config/api";
import axios from "axios";

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
