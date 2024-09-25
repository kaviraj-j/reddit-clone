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