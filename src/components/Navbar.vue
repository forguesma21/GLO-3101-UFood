<template>
  <header class="header">
    <nav class="nav container">
      <router-link to="/">
        <img src="@/assets/UFood_desktop.png" class="logo-nav" />
      </router-link>

      <UserSearchBar v-if="!isProfileRoute && userInfo" class="search" />

      <li v-if="!userInfo && isProfileRoute">
        <router-link to="/" style="white-space: nowrap; cursor: pointer">
          Home
        </router-link>
      </li>

      <div v-if="!isLoggedIn && !isProfileRoute">
        <p style="cursor: pointer" @click="openModal">Log in</p>
        <ConnectionModal
          v-if="isModalOpened"
          :isOpen="isModalOpened"
          @modal-close="closeModal"
        />
      </div>

      <div v-if="isLoggedIn && userInfo">
        <div class="avatar-login" v-if="userInfo">
          <Gravatar :email="userInfo.email" />
          <div>
            <p
              class="userinfoname"
              style="font-weight: 500; width: min-content"
            >
              {{ userInfo.name }}
            </p>
            <p style="font-size: var(--small-font-size)" class="userEmail">
              {{ userInfo.email }}
            </p>
          </div>
          <v-menu
            ><template v-slot:activator="{ props }">
              <i
                :class="isIconDown ? 'bx bx-chevron-down' : 'bx bx-chevron-up'"
                style="cursor: pointer"
                v-bind="props"
              ></i>
            </template>
            <v-list>
              <v-list-item @click="navigateToProfile">
                <v-list-item-title>My profile</v-list-item-title>
              </v-list-item>

              <v-list-item @click="logout">
                <v-list-item-title>Log out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import UserSearchBar from "@/components/common/UserSearchBar.vue"
import ConnectionModal from "@/components/ConnectionModal.vue"
import { getTokenInfo } from "@/services/userAPI"
import Cookies from "js-cookie"
import { ref, computed, onMounted } from "vue"
import { logoutHandler } from "@/store/auth.js"
import Gravatar from "./common/Gravatar.vue"
import { useRoute, useRouter } from "vue-router"

const userInfo = ref(null)
const route = useRoute()
const isIconDown = ref(true)
const isModalOpened = ref(false)
const isLoggedIn = ref(false)
const router = useRouter()

const isProfileRoute = computed(
  () => route && route.path.startsWith("/profile")
)

const isHomeRoute = computed(() => route && route.path.startsWith("/"))

const loadUserInfo = async () => {
  if (Cookies.get("access_token")) {
    userInfo.value = await getTokenInfo()
    isLoggedIn.value = true
  }
}

const openModal = () => {
  isModalOpened.value = true
}

const closeModal = () => {
  isModalOpened.value = false
}

const logout = () => {
  logoutHandler()
  location.reload()
}

onMounted(async () => {
  await loadUserInfo()
})

function navigateToProfile() {
  router.push(`/profile/${userInfo.value.id}`).then(() => {
    if (
      router.currentRoute.value.fullPath === `/profile/${userInfo.value.id}`
    ) {
      location.reload() // Force reload if still on the same profile
    }
  })
}
</script>

<style scoped>
.avatar-login {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dropdown-menu {
  width: min-content;
  position: absolute;
  border-radius: 10px;
  right: 3rem;
  right: 3rem;
  top: 2.5rem;
  transition: opacity 0.3s ease-in-out;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  text-wrap: nowrap;
}

.dropdown-content {
  font-family: var(--body-font);
  font-size: var(--h3-font-size);
  padding: 1rem;
}
.dropdown-content:hover {
  background-color: rgba(255, 165, 0, 0.2);
  cursor: pointer;
}

.logo-nav {
  width: 6rem;
}
.nav.container {
  height: 2rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}
.header {
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  background-color: var(--body-color);
}
.nav {
  height: calc(var(--header-height)+1.5rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
}
.nav-logo {
  width: 3rem;
}

.nav__list {
  display: flex;
  column-gap: 2rem;
}

.nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--small-font-size);
  color: var(--title-color);
  font-weight: var(--font-medium);
  transition: 0.3s;
}

.nav__icon,
.nav__close,
.nav__toggle {
  display: none;
}

#app {
  width: 100vw;
}
/* ACTIVE LINK */
.active-link,
.nav__link:hover {
  color: var(--title-color-dark);
}

.userinfoname {
  font-weight: 500;
  width: min-content;
}

@media screen and (max-width: 768px) {
  .search-bar {
    width: 300px;
  }
}
@media screen and (max-width: 594px) {
  .search-bar {
    display: none;
  }
}

@media screen and (min-width: 425px) {
  .userinfoname {
    font-weight: 500;
    width: min-content;
    white-space: nowrap;
  }
}

@media screen and (max-width: 320px) {
  .logo-nav {
    width: 5rem;
  }

  .userEmail {
    display: none;
  }
}

@media screen and (max-width: 425px) {
  .userEmail {
    display: none;
  }

  .user-search-bar {
    display: none;
  }
}
</style>
