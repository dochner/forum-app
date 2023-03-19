import { defineStore, acceptHMRUpdate } from "pinia";
import { User } from "~/types";

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: <User | null>null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
