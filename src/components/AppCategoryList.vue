<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const forumStore = useForumStore();

const getForumsForCategory = (category) => {
  return forumStore.forums.filter((forum) => forum.categoryId === category.id);
};
</script>

<template>
  <AppForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :title="category.name"
    :category-id="category.id"
  ></AppForumList>
</template>
