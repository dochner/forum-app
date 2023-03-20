import { acceptHMRUpdate, defineStore } from "pinia";
import type { ID, User } from "~/types";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: <User[] | null>null,
  }),
  getters: {
    getUsers: (state) => state.users,
    getUserById: (state) => {
      return (userId: ID) => state.users?.find((user) => user.id === userId);
    },
  },
  actions: {
    setUsers(user: User[] | null) {
      this.users = user;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
