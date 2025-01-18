<template>
  <div>
    <div class="profile" v-if="visitedRestaurants.items">
      <User :userInfo="userInfo" :visitedRestaurants="visitedRestaurants" />
      <v-divider
        style="width: 85%; margin: auto"
        class="border-opacity-25"
      ></v-divider>
      <UserRecentRestaurant :visitedRestaurants="visitedRestaurants" />
      <v-divider
        style="width: 85%; margin: auto"
        class="border-opacity-25"
      ></v-divider>
      <ListsSections />
    </div>
  </div>
</template>

<script>
import User from "@/components/User.vue"
import ListsSections from "@/components/profile/ListsSection.vue"
import UserRecentRestaurant from "@/components/profile/UserRecentRestaurant.vue"
import { getUserInfo, getVisitedUserInfo } from "@/services/userAPI"
import { getVisitedRestaurants } from "@/services/userAPI"
import { ref, watch } from "vue"

const userId = ref(null)

export default {
  components: {
    User,
    ListsSections,
    UserRecentRestaurant,
  },
  data() {
    return {
      userInfo: {
        type: Object,
        required: true,
      },
      visitedRestaurants: {
        type: Object,
        required: true,
      },
    }
  },
  methods: {
    async fetchViewData() {
      try {
        this.visitedUser = getVisitedUserInfo()
        this.userInfo = await getUserInfo(this.visitedUser)
        this.visitedRestaurants = await getVisitedRestaurants(this.visitedUser)
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors du chargement des données :",
          error
        )
      }
    },
  },
  async mounted() {
    this.fetchViewData()
  },
}
</script>

<style>
.profile {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
