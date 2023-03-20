<script setup>
const props = defineProps({
  id: String,
});
</script>

<template>
  <div v-if="id">
    <h1>{{ id }}</h1>
  </div>
</template>
