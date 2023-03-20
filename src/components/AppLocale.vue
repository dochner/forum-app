<script setup>
const { availableLocales: locales, locale } = useI18n();
</script>

<template>
  <div class="flex items-center">
    <div
      v-for="(item, index) in locales"
      :key="index"
      class="flex items-center cursor-pointer"
      @click="locale = item"
    >
      <span v-if="index % 2">&nbsp;|&nbsp;</span>
      {{ item }}
    </div>
  </div>
</template>
