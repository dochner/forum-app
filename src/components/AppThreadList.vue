<script setup>
defineProps({
  threads: Array,
});
const usersStore = useUsersStore();
const users = computed(() => usersStore.users);
const userById = (userId) => findById(users.value, userId);

// const postsStore = usePostsStore();
// const posts = computed(() => postsStore.posts);
// const postById = (postId) => findById(posts.value, postId);
</script>

<template>
  <div>
    <div>
      <h2>{{ $t("title.threads") }}</h2>

      <div v-if="threads.length">
        <div v-for="thread in threads" :key="thread.id">
          <div>
            <p>
              <RouterLink
                :to="{ path: '/threads/:id', params: { id: thread.id } }"
              >
                {{ thread.title }}
              </RouterLink>
            </p>
            <p>
              {{ $t("by") }} <a href="#">{{ userById(thread.userId).name }}</a
              >, <AppDate :timestamp="thread.publishedAt" />.
            </p>
          </div>

          <div>
            <p class="replies-count">
              {{ thread.repliesCount }} {{ $t("replies") }}
            </p>

            <AppAvatarImg :src="userById(thread.userId).avatar" />

            <div>
              <p>
                <a href="#">{{ userById(thread.userId).name }}</a>
              </p>
              <p>
                <AppDate :timestamp="thread.publishedAt" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!threads.length" style="padding: 10px; text-align: center">
      <em>{{ $t("title.no_threads_available") }}</em>
    </div>
  </div>
</template>
