export interface User {
  username: string;
  email: string;
  id: string;
  firstName?: string;
  lastName?: string;
}

export interface Subreddit {
  id: string;
  name: string;
  description: string;
  bannerImageUrl: string | null;
  iconImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  membersCount: number;
}
