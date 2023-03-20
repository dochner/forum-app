<script setup lang="ts">
import type { Post } from "~/types";

interface Props {
  post: Post;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "save", post: Post): void;
}>();

const postCopy = reactive(props.post);
const formKey = ref(Math.random());

const handleSubmit = () => {
  emit("save", postCopy);
  postCopy.text = "";
  formKey.value = Math.random();
};
</script>

<template>
  <div>
    <VeeForm :key="formKey" @submit="handleSubmit">
      <AppFormField
        v-model="postCopy.text"
        name="text"
        as="textarea"
        rows="10"
        cols="30"
        rules="required"
      />
      <button type="submit">
        {{ post.id ? "Update Post" : "Submit post" }}
      </button>
    </VeeForm>
  </div>
</template>
