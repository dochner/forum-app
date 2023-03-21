<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,

// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: "Forum",
  meta: [
    { name: "description", content: "Forum app" },
    {
      name: "theme-color",
      content: "#00aba9",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
  ],
});

const { session, getUser } = useAuth();

watchOnce(session, () => {
  if (session.value) {
    getUser();
  }
});
</script>

<template>
  <RouterView />
  <notifications />
</template>
