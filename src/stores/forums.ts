import { acceptHMRUpdate, defineStore } from "pinia";
import type { Forum, ID } from "./../types/index";

export const useForumStore = defineStore({
  id: "forums",
  state: () => ({
    forums: <Forum[] | undefined>[],
  }),
  getters: {
    getForums: (state) => state.forums,
    getForumById: (state) => {
      return (forumId: ID) => {
        return state.forums?.find((forum) => forum.id === forumId);
      };
    },
  },
  actions: {
    setForums(forums: Forum[] | undefined) {
      this.forums = forums;
    },
    async fetchForums(forumIds: ID[]) {
      const { data, onError } = await useFetchData("/api/forums");

      if (data.value) {
        this.setForums(data.value);
      }
      onError((err) => {
        console.log("error", err);
      });
    },
    async fetchForum(forumId: ID) {
      const { data } = await useFetchData(`/api/forums/${forumId}`);

      return data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForumStore, import.meta.hot));
}
