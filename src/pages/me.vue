<script setup>
const { session, loading, user, signOut, updateUser } = useAuth();
</script>

<template>
  <VeeForm class="form-widget" @submit="updateUser">
    <AppAvatarImg
      :path="user?.avatar_url"
      size="10"
      @updat:path="() => (user.avatar_url = $event)"
      @upload="updateUser"
    />
    <div>
      <AppFormField
        :model-value="session.user?.email"
        label="E-mail"
        name="email"
        disabled
      />
    </div>
    <div>
      <AppFormField
        :model-value="user?.username"
        label="Username"
        name="username"
        @update:model-value="() => (user.username = $event)"
      />
    </div>
    <div>
      <AppFormField
        :model-value="user?.full_name"
        label="Full Name"
        name="fullName"
        @update:model-value="() => (user.name = $event)"
      />
    </div>
    <div>
      <AppFormField
        :model-value="user?.website"
        label="Website"
        name="website"
        @update:model-value="() => (user.website = $event)"
      />
    </div>

    <div>
      <button type="submit" class="button primary block" :disabled="loading">
        {{ loading ? "Loading ..." : "Update" }}
      </button>
    </div>

    <div>
      <button class="button block" :disabled="loading" @click="signOut">
        Sign Out
      </button>
    </div>
  </VeeForm>
</template>
