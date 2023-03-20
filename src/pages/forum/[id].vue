<script setup>
const props = defineProps({
  id: String,
});

watch(page, (newPage) => {
  router.replace({ query: { page: Number(newPage) } });
});

useHead({
  title: forum.name,
  meta: [
    {
      property: "og:title",
      content: forum?.name,
    },
    {
      name: "twitter:title",
      content: forum?.name,
    },
  ],
});
</script>

<template>
  <div>
    {{ id }}
  </div>
</template>
