<template>
  <div class="container lists-section">
    <div class="top-section">
      <p class="title-section">My Lists</p>
      <NewListModal
        @listSubmitted="updateUserLists"
        :userInfo="this.userInfo"
        v-if="isCurrentUser"
      />
    </div>

    <p style="margin: auto" v-if="userLists.total == 0">
      You have no lists. Create one, now!
    </p>
    <div class="main-section" v-if="userLists.total !== 0">
      <div v-for="list in userLists.items" :key="list.id" class="list-card">
        <router-link :to="`/list/${list.id}`" class="items">
          <p class="list-name">{{ list.name }}</p>
          <i class="bx bx-chevron-right"></i>
        </router-link>

        <v-dialog
          v-model="dialog"
          max-width="400"
          persistent
          v-if="isCurrentUser"
        >
          <template
            v-if="isCurrentUser()"
            v-slot:activator="{ props: activatorProps }"
          >
            <i v-bind="activatorProps" class="bx bx-trash"></i>
          </template>

          <v-card prepend-icon="mdi mdi-alert-circle" title="Delete this list?">
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn @click="dialog = false"> Cancel </v-btn>

              <v-btn @click="deleteList(list)"> Delete </v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import NewListModal from "@/components/list-page/NewListModal.vue"
import { getUserLists, getUserInfo, getTokenInfo } from "@/services/userAPI"
import { ref } from "vue"
import Cookies from "js-cookie"

const userData = ref(null)

import { deleteRestaurantList } from "@/services/favoriteAPI.js"
export default {
  components: {
    NewListModal,
  },
  data() {
    return {
      userLists: {
        type: Object,
        required: true,
      },
      dialog: false,
      userInfo: {
        type: Object,
        required: true,
      },
    }
  },
  async mounted() {
    const id = this.$route.path.replace("/profile/", "")

    userData.value = await getTokenInfo()
    this.userInfo = await getUserInfo(userData.value.id)
    this.userLists = await getUserLists(id)

    //  this.userLists = await getUserLists(this.userInfo.id)
  },
  methods: {
    async updateUserLists() {
      this.$router.go(0)
      const id = this.$route.path.replace("/profile/", "")
      this.userLists = await getUserLists(id)
    },
    isCurrentUser() {
      const id = this.$route.path.replace("/profile/", "")
      const connectedUserId = Cookies.get("userId")

      if (connectedUserId == id && connectedUserId != null) {
        return true
      }
      return false
    },
    deleteList(target) {
      this.$forceUpdate()
      deleteRestaurantList(target.id)
        .then(() => {
          this.dialog = false
          location.reload()
        })
        .catch((error) => {
          console.error("Error deleting list:", error)
        })
    },
  },
}
</script>

<style>
.container.lists-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}
.top-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
}
.lists-section .title-section {
  font-size: var(--h12-font-size);
  margin-bottom: 0;
  margin-left: 0;
  font-weight: var(--font-bold);
}
.new-list-button {
  width: min-content;
  background-color: #ff7e00;
  border-radius: 25px;
  color: white;
  font-size: var(--normal-font-size);
  text-wrap: nowrap;
  align-self: center;
  padding: 5px 10px 5px 10px;
}
.main-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.list-card {
  display: flex;
  width: 85%;
  background-color: #f6f6f6;
  align-items: center;
  height: 115px;
  padding: 30px;
  border-radius: 13px;
  gap: 1rem;
}
.list-name {
  font-size: 1.6rem;
}
.items {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
