<script setup>
import vClickOutside from "~/directives/clickOutside";
import vPageScroll from "~/directives/pageScroll";
const userStore = useUserStore();

const mobileMenu = ref(false);

const hideMenu = () => {
  mobileMenu.value = false;
};

const toggleMenu = () => {
  mobileMenu.value = !mobileMenu.value;
};
</script>

<template>
  <header v-click-outside="hideMenu" v-page-scroll="hideMenu">
    <RouterLink to="/">
      <img src="/favicon.svg" alt="" aria-hidden />
    </RouterLink>

    <button @click.stop="toggleMenu">
      <div v-if="!mobileMenu" class="h-6 w-6 i-carbon-menu"></div>
      <div v-else class="h-6 w-6 i-carbon-close"></div>
    </button>

    <nav>
      <ul>
        <li v-if="userStore.user">
          <a
            v-click-outside="() => (userDropdownOpen = false)"
            @click.prevent="userDropdownOpen = !userDropdownOpen"
          >
            <AppAvatarImg
              :src="userStore.user.avatar"
              :alt="`${userStore.user.name} profile picture`"
            />
            <span>
              {{ userStore.user.name }}
              <div class="h-6 w-6 i-carbon-chevron-down" />
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div>
            <div class="h-6 w-6 i-carbon-chevron-down"></div>
            <ul>
              <li>
                <router-link to="/me"> View profile </router-link>
              </li>
              <li>
                <a @click.prevent="userStore.logout(), $router.push('/')">
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>
