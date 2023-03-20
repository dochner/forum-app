<script setup lang="ts">
interface Props {
  color?: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="animate-spin animate-duration-1000 animate-both animate-ease i-carbon-progress-bar-round text-indigo-500 h-10 w-10"
    :style="{ color }"
  ></div>
</template>
