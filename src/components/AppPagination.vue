<script setup lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const props = defineProps<Props>();

defineEmits(["update:modelValue"]);

defineModel<{ modelValue: string }>();

interface Props {
  pages?: number;
  rangeSize?: number;
  activeColor?: string;
  hideFirstButton?: boolean;
  hideLastButton?: boolean;
}
</script>

<template>
  <VPagination v-bind="props"></VPagination>
</template>
