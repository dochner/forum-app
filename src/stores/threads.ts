import { acceptHMRUpdate, defineStore } from "pinia";
import type { ID, Thread } from "./../types/index";

export const useThreadsStore = defineStore({
  id: "threads",
  state: () => ({
    threads: <Thread[] | null>[],
  }),
  getters: {
    getThreads: (state) => state.threads,
    getThreadsByIds: (state) => {
      return (ids: ID[]) => {
        if (ids?.length) {
          return state.threads?.filter((thread) => ids.includes(thread.id));
        }
      };
    },
  },
  actions: {
    setThreads(threads: Thread[] | null) {
      this.threads = threads;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThreadsStore, import.meta.hot));
}
