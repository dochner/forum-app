import { acceptHMRUpdate, defineStore } from "pinia";
import type { Category } from "./../types/index";

export const useCategoryStore = defineStore({
  id: "categories",
  state: () => ({
    categories: <Category[] | undefined>[],
  }),
  getters: {
    getCategoryById: (state) => {
      return (id: string) => {
        return state.categories?.find((category) => category.id === id);
      };
    },
    getCategories: (state) => state.categories,
  },
  actions: {
    setCategories(categories: Category[] | undefined) {
      this.categories = categories;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
