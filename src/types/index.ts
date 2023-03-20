import type { App } from "vue";
import type { Router } from "vue-router";

export interface VueContext {
  app: App;
  router: Router;
}

export type UserModule = (ctx: VueContext) => void;

export type ID = string;

export interface Stat {
  postsCount: number;
  threadsCount: number;
  usersCount: number;
  usersOnline: number;
}

export interface User {
  id: ID;
  name: string;
  username: string;
  userNameLower: string;
  email: string;
  avatar: string;
  isModerator: boolean;
  createdAt: EpochTimeStamp;
  lastVisitAt: EpochTimeStamp;
}

export interface Thread {
  id: ID;
  firstPostId: string;
  forumId: string;
  lastPostAt: EpochTimeStamp;
  lastPostId: string;
  posts: ID[];
  slug: string;
  title: string;
  userId: string;
}

export interface Post {
  id: ID;
  threadId?: string;
  userId?: string;
  text?: string;
  publishedAt?: EpochTimeStamp;
  edited?: {
    at: EpochTimeStamp;
    by: string;
    moderated: boolean;
  };
}

export interface Forum {
  id: ID;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  threads: ID[];
  lastPostId: Post;
}

export interface Category {
  id: ID;
  name: string;
  slug: string;
  forums: ID[];
}
