<template>
  <div class="profile container" v-if="userInfo">
    <div class="profile-content">
      <Gravatar :email="userInfo.email" />
      <div>
        <p v-if="userInfo.name" class="profile-name">
          {{ userInfo.name }}
        </p>

        <p class="info-title">Username</p>
        <p v-if="userInfo.name">{{ userInfo.name }}</p>
        <p class="info-title">Email</p>
        <p v-if="userInfo.email" style="text-wrap: wrap">
          {{ userInfo.email }}
        </p>
      </div>
      <div v-if="!isCurrentUser()" class="follow-container">
        <button class="unfollow-btn" v-if="isFollowed()" @click="unfollow()">
          Unfollow
        </button>
        <button class="follow-btn" v-else @click="follow()">Follow</button>
      </div>
    </div>

    <UserTags :userInfo="userInfo" :visitedRestaurants="visitedRestaurants" />
  </div>
</template>

<script>
import UserTags from "@/components/profile/UserTags.vue"
import Gravatar from "./common/Gravatar.vue"
import { unfollowUser } from "@/services/followAPI.js"
import { followUser } from "@/services/followAPI.js"
import Cookies from "js-cookie"

export default {
  components: {
    UserTags,
    Gravatar,
  },
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
    visitedRestaurants: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isCurrentUser() {
      const connectedUserId = Cookies.get("userId")
      if (connectedUserId == this.userInfo.id) {
        return true
      } else if (this.userInfo == null || this.userInfo == undefined) {
        return true
      }
      return false
    },
    isFollowed() {
      const connectedUserId = Cookies.get("userId")
      if (
        this.userInfo.followers.find((element) => element.id == connectedUserId)
      ) {
        return true
      }
      return false
    },
    async follow() {
      try {
        await followUser(this.userInfo.id)
        this.$forceUpdate()
        location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    async unfollow() {
      try {
        await unfollowUser(this.userInfo.id)
        this.$forceUpdate()
        location.reload()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style>
.profile.container {
  width: 80%;
  margin: auto;
  margin-top: 80px;
  justify-content: center;
  border: 0.5px solid;
  border-color: var(--orange);
  border-radius: 20px;
  box-shadow: -1px 1px 5.3px 5px rgba(0, 0, 0, 0.1);
  padding: 5%;
  justify-content: center;
  position: relative;
  display: flex;
  flex-direction: column;
}
.profile-info {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edit-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 25px;
}
.profile-content {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  width: auto;
}
.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-title {
  color: #8e8e8e;
  font-size: var(--small-font-size);
}
.profile-name {
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.85rem;
}

.follow-container {
  display: inline-flex;
  justify-content: flex-center;
  margin-left: auto;
  margin-right: 5%;
}
.follow-btn {
  background-color: var(--orange);
  height: 30px;
  width: 100px;
  border-radius: 10%;
}
.unfollow-btn {
  background-color: var(--light-grey);
  height: 30px;
  width: 100px;
  border-radius: 10%;
}
@media screen and (max-width: 992px) {
}
@media screen and (min-width: 992px) {
  .profile.container {
    max-width: 1000px;
    padding: 30px;
  }
}

/* mobile */
@media screen and (max-width: 425px) {
  .profile-content {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  .tag-section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
  .profile-name {
    text-align: center;
  }
}

@media screen and (max-width: 860px) {
  .tag-section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
}
</style>
