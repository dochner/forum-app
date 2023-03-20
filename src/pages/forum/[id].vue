<script setup>
const props = defineProps({
  id: String,
});

const route = useRoute();
const router = useRouter();
const page = ref(route?.query?.page || 0);
const perPage = ref(10);

const forumStore = useForumStore();
const forum = await forumStore.fetchForum(props.id);

const threadsStore = useThreadsStore();
await threadsStore.fetchThreadsByPage({ ids: forum.value.threads });
const threads = computed(() =>
  threadsStore.threads
    .filter((thread) => thread?.forumId === forum.value?.id)
    .map((thread) => threadsStore.getThread(thread.id))
);
const threadCount = computed(() => threads.value?.length || 0);
const totalPages = computed(() => {
  if (!threadCount.value) {
    return 0;
  } else {
    return Math.ceil(threadCount.value / perPage.value);
  }
});

watch(page, (newPage) => {
  router.replace({ query: { page: newPage } });
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
    <div>page: {{ page }}</div>

    <div class="flex items-center space-x-4">
      <button v-for="(p, index) in 10" :key="index" @click="() => (page = p)">
        {{ p }}
      </button>
    </div>
  </div>
</template>
