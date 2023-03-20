<script setup lang="ts">
const categoryStore = useCategoryStore();
const asyncDataStatus = useAsyncDataStatus();

const categories = computed(() => categoryStore.categories);

onBeforeMount(async () => {
  await categoryStore.fetchCategories();
});
</script>

<template>
  <div v-if="asyncDataStatus.isReady">
    <h1>{{ $t("intro.welcome") }}</h1>
    <AppCategoryList :categories="categories"></AppCategoryList>
  </div>
</template>
