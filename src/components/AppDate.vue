<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedDate from "dayjs/plugin/localizedFormat";

interface Props {
  timestamp: number | Record<string, any>;
}
const props = defineProps<Props>();

dayjs.extend(relativeTime);
dayjs.extend(localizedDate);

const normalizedTimestamp = computed(() =>
  typeof props.timestamp === "number"
    ? props.timestamp
    : props.timestamp?.seconds
);

const diff = computed(() => dayjs.unix(normalizedTimestamp.value).fromNow());

const date = computed(() =>
  dayjs.unix(normalizedTimestamp.value).format("llll")
);
</script>

<template>
  <span :title="date">
    {{ diff }}
  </span>
</template>
