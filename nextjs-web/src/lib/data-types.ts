export interface NewUserPayload {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface SignInUserPayload {
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface NewSubredditPayload {
  name: string;
  description: string;
}

export interface SubReddit {
  id: string;
  name: string;
  description: string;
  bannerImageUrl: string | null;
  iconImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

export interface Post {
  id: string;
  title: string;
  author: User;
  upvotes: number;
  content: string;
  subreddit: SubReddit;
}

export interface NewPost {
  title: string;
  content: string;
  subredditId?: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
