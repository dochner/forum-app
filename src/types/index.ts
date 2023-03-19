import { App } from "vue"
import { Router } from "vue-router"

export type VueContext = {
  app: App
  router: Router
}

export type UserModule = (ctx: VueContext) => void

export type ID = string;

export type Stat = {
  postsCount: number;
  threadsCount: number;
  usersCount: number;
  usersOnline: number;
}

export type Category = {
  id: ID;
  name: string;
  slug: string;
  forums: ID[]
}

export type Post = {
  id: ID;
  threadId: string;
  userId: string;
  text: string;
  publishedAt: EpochTimeStamp;
  edited: {
    at: EpochTimeStamp;
    by: string;
    moderated: boolean;
  }
}

export type Forum = {
  id: ID;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  theads: ID[];
  lastPostId: Post;
}

export type User = {
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

export type Thread = {
  id: ID;
  firstPostId: string;
  forumId: string;
  lastPostAt: EpochTimeStamp;
  lastPostId: string;
  posts: Post[];
  slug: string;
  title: string;
  userId: string;
}
