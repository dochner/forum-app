import { acceptHMRUpdate, defineStore } from "pinia";
import type { Category } from "./../types/index";

export const useCategoryStore = defineStore({
  id: "categories",
  state: () => ({
    categories: <Category[] | undefined>[],
  }),
  getters: {
    getCategories: (state) => state.categories,
    getForums: (state) =>
      state.categories?.map((category) => category.forums).flat(),
  },
  actions: {
    setCategories(categories: Category[] | undefined) {
      this.categories = categories;
    },
    async fetchCategories() {
      setTimeout(async () => {
        const { data, onError } = await useFetchData("/api/categories");

        if (data.value) {
          this.setCategories(JSON.parse(data.value));
        }
        onError((err) => {
          console.log("error", err);
        });
      }, 2000);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
