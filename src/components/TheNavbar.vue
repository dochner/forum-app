<script setup>
const userStore = useUserStore();

const mobileMenu = ref(false);
</script>

<template>
  <header
    v-click-outside="() => (mobileMenu = false)"
    v-page-scroll="() => (mobileMenu = false)"
  >
    <RouterLink to="/">
      <img src="/favicon.svg" alt="" aria-hidden />
    </RouterLink>

    <button>
      <div v-if="mobileMenu" class="h-6 w-6 i-carbon-menu"></div>
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
          <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpen }">
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
