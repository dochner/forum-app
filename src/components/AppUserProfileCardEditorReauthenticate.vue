<script setup>
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "success", "fail"]);

const formData = ref({
  email: "",
  password: "",
});

const showModal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const reauthenticate = async () => {
  // TODO: implements reauthenticate login method
  try {
    // await authStore.reauthenticate(formData.value);
    emit("success");
  } catch (error) {
    emit("fail");
  }
};
</script>

<template>
  <AppModal v-model="showModal" :title="$t('title.login_again')">
    <VeeForm @submit="reauthenticate">
      <AppFormField
        v-model="formData.email"
        name="reauth-email"
        label="E-mail"
        rules="email"
      />
      <AppFormField
        v-model="formData.password"
        name="reauth-password"
        :label="$t('label.password')"
        type="password"
      />
      <button>Login</button>
    </VeeForm>
  </AppModal>
</template>
