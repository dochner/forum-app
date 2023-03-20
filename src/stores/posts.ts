import { acceptHMRUpdate, defineStore } from "pinia";
import type { Post } from "~/types";

export const usePostsStore = defineStore({
  id: "posts",
  state: () => ({
    posts: <Post[] | null>null,
  }),
  getters: {
    getPosts: (state) => state.posts,
  },
  actions: {
    setPosts(posts: Post[] | null) {
      this.posts = posts;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot));
}
