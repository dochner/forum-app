<script setup>
import { notify } from "@kyvg/vue3-notification";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const uploadingImage = ref(false);
const activeUser = reactive(props.user);
const locationOptions = ref([]);
const needsReAuth = ref(false);

const loadLocationOptions = async () => {
  if (!locationOptions.value.length) {
    const { data } = useFetchData("https://restcountries.com/v3/all");

    if (data.value) {
      locationOptions.value = data.value;
    }
  }
};

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];

  if (file) {
    uploadingImage.value = true;

    const { data } = await useUploadFile(file);

    if (data.value) {
      activeUser.value.avatar = data.value || activeUser.value.avatar;
    }

    uploadingImage.value = false;
  }
};

const handleRandomAvatarUpload = async () => {
  const randomAvatarGenerated =
    activeUser.value.avatar.startsWith("https://pixabay");
  if (randomAvatarGenerated) {
    const { data: image } = await useFetchData(activeUser.value.avatar);
    const blob = await image.value.blob();
    // TODO: IMPLEMENTS UPLOADAVATAR FUNCTION!
    // activeUser.value.avatar = await uploadAvatar({
    //   file: blob,
    //   filename: "random",
    // });
  }
};

const onReauthenticated = async () => {};
const onReauthenticatedFailed = async () => {
  notify({
    title: "Error",
    type: "error",
    text: "Error updating user",
  });

  router.push("/me");
};
const saveUserData = async () => {
  notify({
    title: "Success",
    type: "success",
    text: "User succesfully updated",
  });
  router.push("/me");
};

const handleSubmit = async () => {
  await handleRandomAvatarUpload();

  const emailChanged = activeUser.value.email !== props.user.email;

  if (emailChanged) {
    needsReAuth.value = true;
  } else {
    await saveUserData();
  }
};

const cancel = () => {
  router.push("/me");
};
</script>

<template>
  <div>
    <VeeForm @submit="handleSubmit">
      <p>
        <label for="avatar">
          <AppAvatarImg
            :src="activeUser.avatar"
            :alt="`${$t('profile_picture', { name: user.name })}`"
          />
          <div>
            <AppSpinner v-if="uploadingImage" color="white" />
            <div
              v-else
              class="i-carbon-camera h-6 w-6"
              :style="{ color: 'white', opacity: '.8' }"
            />
          </div>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            @change="handleAvatarUpload"
          />
        </label>
      </p>
      <AppUserProfileCardEditorRandomAvatar @hit="activeUser.avatar = $event" />

      <AppFormField
        v-model="activeUser.username"
        name="username"
        :label="$t('label.username')"
        :rules="`required|unique:users,username,${user.username}`"
      />
      <AppFormField
        v-model="activeUser.name"
        :label="$t('label.full_name')"
        name="name"
        rules="required"
      />
      <AppFormField
        v-model="activeUser.bio"
        :label="$t('label.bio')"
        name="bio"
        as="textarea"
        :placeholder="$t('placeholder.about_yourself')"
      />

      <div>
        <span>{{ user.postsCount }} {{ $t("posts") }}</span>
        <span>{{ user.threadsCount }} {{ $t("threads") }}</span>
      </div>

      <hr />

      <AppFormField
        v-model="activeUser.website"
        label="Website"
        name="website"
        rules="url"
      />
      <AppFormField
        v-model="activeUser.email"
        label="E-mail"
        name="email"
        :rules="`required|email|unique:users,email,${user.email}`"
      />
      <AppFormField
        v-model="activeUser.location"
        :label="$t('label.location')"
        name="location"
        list="locations"
        @mouseenter="loadLocationOptions"
      />
      <datalist id="locations">
        <option
          v-for="location in locationOptions"
          :key="location.name.common"
          :value="location.name.common"
        />
      </datalist>

      <div>
        <button @click.prevent="cancel">{{ $t("button.cancel") }}</button>
        <button type="submit">{{ $t("button.save") }}</button>
      </div>
    </VeeForm>
    <AppUserProfileCardEditorReauthenticate
      v-model="needsReAuth"
      @success="onReauthenticated"
      @fail="onReauthenticatedFailed"
    />
  </div>
</template>
