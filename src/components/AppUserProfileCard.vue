<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <div>
      <p>
        <AppAvatarImg
          :src="user.avatar"
          :alt="`${user.name} ${$t('profile_picture')}`"
        />
      </p>
      <h1>{{ user.username }}</h1>
      <p>{{ user.name }}</p>
      <p>{{ user.bio || $t("no_bio") }}</p>
      <span>{{ user.username }} {{ $t("is_online") }}</span>

      <div>
        <span>{{ user.postsCount }} {{ $t("posts") }}</span>
        <span>{{ user.threadsCount }} {{ $t("threads") }}</span>
      </div>

      <hr />

      <p v-if="user.website">
        <i class="i-carbon-earth"></i>
        <a :href="user.website">{{ user.website }}</a>
      </p>
    </div>
    <div>
      <RouterLink to="/me/edit"> {{ $t("button.edit_profile") }} </RouterLink>
    </div>
  </div>
</template>
