<script setup lang="ts">
interface Props {
  src?: string;
}

defineProps<Props>();
</script>

<template>
  <img :src="src || '/user-placeholder.png'" alt="" aria-hidden />
</template>
