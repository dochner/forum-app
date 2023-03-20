<script setup lang="ts">
import type { Forum } from "~/types";

interface Props {
  forums: Array<Forum>;
  title?: string;
  categoryId?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Forums",
});

const getThreadsTitle = (threads: string[]) => {
  return threads?.length > 1
    ? "threads"
    : !threads?.length
    ? "no threads"
    : "thread";
};
</script>

<template>
  <div>
    <div>
      <h2>
        <RouterLink
          v-if="categoryId"
          :to="`/category/${encodeURIComponent(categoryId)}`"
          >{{ title }}</RouterLink
        >
        <span v-else>{{ title }}</span>
      </h2>

      <div v-for="forum in forums" :key="forum.id">
        <div>
          <RouterLink :to="`/forum/${encodeURIComponent(forum.id)}`">
            <h3>{{ forum.name }}</h3>
          </RouterLink>

          <p>{{ forum.description }}</p>
        </div>
        <div>
          <p>
            <span>{{ forum.threads?.length }}</span>
            {{ getThreadsTitle(forum.threads) }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>
    </div>
  </div>
</template>
