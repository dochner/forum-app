<script setup>
import { notify } from "@kyvg/vue3-notification";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await useSupabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) {
      throw error;
    } else {
      notify({
        title: "Success",
        type: "success",
        text: "Check your email for the login link!",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      notify({
        title: "Error",
        type: "error",
        text: error.message,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <VeeForm @submit="handleLogin">
    <div>
      <h1 class="header">Forum App</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <AppFormField
          v-model="email"
          type="email"
          name="email"
          label="E-mail"
          rules="required|email"
          placeholder="Your email"
        />
      </div>
      <div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Loading" : "Send magic link" }}
        </button>
      </div>
    </div>
  </VeeForm>
</template>
