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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForumStore, import.meta.hot));
}
