<script setup lang="ts">
interface Props {
  name: string;
  label: string;
}

withDefaults(defineProps<Props>(), {
  name: "",
  label: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", value?: string): void;
}>();

defineModel<{
  modelValue: string;
}>();
</script>

<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <VeeField
      :id="name"
      :name="name"
      :label="label"
      :model-value="modelValue"
      class="form-input"
      v-bind="$attrs"
      @input="emit('update:modelValue', $event)"
    />
    <VeeErrorMessage :name="name" class="form-error" />
  </div>
</template>
