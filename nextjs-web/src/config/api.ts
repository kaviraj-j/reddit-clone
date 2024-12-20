export const apiBaseUrl: string =
  process.env.SERVER_BASE_URL ?? "http://localhost:8080";

export const authUrl = {
  signUp: `${apiBaseUrl}/auth/signup`,
  signIn: `${apiBaseUrl}/auth/login`,
  validateToken: `${apiBaseUrl}/auth/validate`,
};

export const subredditUrl = {
  new: `${apiBaseUrl}/subreddit/new`,
  getDetails: `${apiBaseUrl}/subreddit`,
  follwedSubReddits: `${apiBaseUrl}/subreddit/follwed`,
  getPosts: `${apiBaseUrl}/posts`,
};

export const postUrl = {
  getPosts: `${apiBaseUrl}/post`,
  newPost: `${apiBaseUrl}/post/new`,
  getPostDetails: `${apiBaseUrl}/post`,
  getPostComments: `${apiBaseUrl}/post`,
  deletePostComments: `${apiBaseUrl}/post`
};
