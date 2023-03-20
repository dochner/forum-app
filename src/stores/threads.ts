import { Thread } from "./../types/index";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useThreadsStore = defineStore({
  id: "threads",
  state: () => ({
    threads: <Thread[] | null>[],
  }),
  getters: {
    getThreads: (state) => state.threads,
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
