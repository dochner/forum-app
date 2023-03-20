<script setup>
import { storeToRefs } from "pinia";
import AppAvatarImg from "./AppAvatarImg.vue";

defineProps({
  posts: {
    type: Array,
    required: true,
  },
});

const editingId = ref(null);
const usersStore = useUsersStore();
const userStore = useUserStore();

const { getUserById } = storeToRefs(usersStore);

const toggleEditMode = (id) => {
  editingId.value = editingId.value ? null : id;
};

const updatePost = (post) => {
  // eslint-disable-next-line no-console
  console.log(post);
};

const handleUpdate = (event) => {
  updatePost(event.post);
  editingId.value = null;
};
</script>

<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <div v-if="getUserById(post.userId)">
        <a href="#">{{ getUserById(post.userId)?.name }}</a>

        <a href="#">
          <AppAvatarImg :src="getUserById(post.userId)?.avatar" />
        </a>
        <p>{{ getUserById(post.userId).postsCount }} posts</p>
        <p>{{ getUserById(post.userId).threadsCount }} threads</p>
      </div>

      <div>
        <div>
          <AppPostEditor
            v-if="editing === post.id"
            :post="post"
            @save="handleUpdate"
          />
          <p v-else>
            {{ post.text }}
          </p>
        </div>
        <a
          v-if="post.userId === userStore.user.id"
          href="#"
          style="margin-left: auto; padding-left: 10px"
          :title="$t('make-a-change')"
          @click.prevent="toggleEditMode(post.id)"
        >
          <div icon="i-carbon-edit" />
        </a>
      </div>

      <div>
        <div v-if="post.edited?.at" class="edition-info">edited</div>
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>
