<script setup lang="ts">
interface Props {
  done?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  done: false,
});

const emit = defineEmits<{
  (event: "load"): void;
}>();

const observer = ref<IntersectionObserver | null>();
const intersectionObserverRef = ref<HTMLElement | null>();

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          emit("load");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    }
  );
  observer.value.observe(intersectionObserverRef.value as Element);
});

onBeforeUnmount(() => {
  observer.value?.unobserve(intersectionObserverRef.value as Element);
});

watch(
  () => props.done,
  () => {
    if (props.done) {
      observer.value?.unobserve(intersectionObserverRef.value as Element);
    }
  }
);
</script>

<template>
  <div ref="intersectionObserverRef" class="inersection-observer"></div>
</template>

<style scoped>
div {
  position: relative;
  z-index: -1;
  pointer-events: none;
  bottom: 200px;
}
</style>
