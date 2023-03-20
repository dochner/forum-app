<script setup>
const props = defineProps({
  title: String,
  text: String,
});

const emit = defineEmits(["clean", "dirty", "save", "cancel"]);

const form = reactive({
  title: props.title,
  text: props.text,
});

const existing = computed(() => !!props.title);

const handleSubmit = () => {
  emit("clean");
  emit("save", form);
};

watch(
  () => form,
  () => {
    if (form.title !== props.title || form.text !== props.text) {
      emit("dirty");
    } else {
      emit("clean");
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <VeeForm @submit="handleSubmit">
    <AppFormField
      v-model="form.title"
      label="Title"
      name="title"
      rules="required"
    />
    <AppFormField
      v-model="form.text"
      as="textarea"
      label="Content"
      name="text"
      rules="required"
      rows="8"
      cols="140"
    />

    <div>
      <button @click.prevent="$emit('cancel')">Cancel</button>
      <button type="submit" name="Publish">
        {{ existing ? "Update" : "Publish" }}
      </button>
    </div>
  </VeeForm>
</template>
