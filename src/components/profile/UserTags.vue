<template>
  <div>
    <div class="tag-section" v-if="userInfo">
      <div class="profile-tag">
        <div class="tag-title">Visits</div>
        <p class="number-title">{{ visitedRestaurants.total }}</p>
      </div>
      <div class="profile-tag">
        <div class="tag-title">Score</div>
        <p class="number-title" v-if="visitedRestaurants">
          {{ visitedRestaurants.total * 10 }}
        </p>
      </div>
      <div class="profile-tag">
        <div class="tag-title">Followers</div>
        <p
          class="number-title"
          style="cursor: pointer"
          v-if="userInfo.followers"
          @click="openModal('Followers')"
        >
          {{ userInfo.followers.length }}
        </p>
      </div>
      <div class="profile-tag">
        <div class="tag-title">Following</div>
        <p
          class="number-title"
          style="cursor: pointer"
          v-if="userInfo.following"
          @click="openModal('Following')"
        >
          {{ userInfo.following.length }}
        </p>
      </div>
    </div>

    <v-dialog v-model="modalVisible" width="auto" scrollable min-width="500px">
      <v-card>
        <v-card-title>{{ modalTitle }}</v-card-title>
        <div class="modal-inside">
          <!-- Contenu du modal en fonction de la section -->
          <div
            v-if="modalSection === 'Following' && userInfo.following"
            class="userInfo-modal"
          >
            <div
              v-for="follower in userInfo.following"
              :key="follower.id"
              class="userinfo-section"
            >
              <div style="display: flex; gap: 10px; align-items: center">
                <v-avatar color="red">
                  <span class="text-h5">{{ follower.name[0] }}</span>
                </v-avatar>
                <p style="text-wrap: nowrap">{{ follower.name }}</p>
              </div>
            </div>
          </div>

          <div v-if="modalSection === 'Followers'" class="userInfo-modal">
            <div
              class="userinfo-section"
              v-for="follower in userInfo.followers"
              :key="follower.id"
            >
              <div style="display: flex; gap: 10px; align-items: center">
                <v-avatar color="red">
                  <span class="text-h5">{{ follower.name[0] }}</span>
                </v-avatar>
                <p>{{ follower.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-btn color="primary" text @click="closeModal">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue"

const modalSection = ref("")
const modalVisible = ref(false)
const modalTitle = ref("")

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
  visitedRestaurants: {
    type: Object,
    required: true,
  },
})
const openModal = (section) => {
  modalSection.value = section
  modalTitle.value = `${section}`
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}
</script>

<style scoped>
.tag-section {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
}
.profile-tag {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tag-title {
  width: min-content;
  background-color: rgba(255, 126, 0, 0.25);
  border-radius: 25px;
  color: #ff7e00;
  padding-left: 10%;
  padding-right: 10%;
}
.number-title {
  font-size: var(--h2-font-size);
  font-weight: 500;
}
.userInfo-modal {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.modal-inside {
  padding: 1rem;
}
.userinfo-section {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

/* Chrome, Safari, Opera */
@-webkit-keyframes follow-animation {
  from {
    background: white;
    color: var(--orange);
    width: 85px;
    left: 50px;
  }
  to {
    background: var(--orange);
    border-color: var(--orange);
    color: #ffffff;
    width: 120px;
    left: 35px;
  }
}
@-webkit-keyframes unfollow-animation {
  from {
    background: var(--orange);
    color: #ffffff;
    width: 120px;
    left: 35px;
  }
  to {
    background: white;
    border-color: #3399ff;
    color: #3399ff;
    width: 85px;
    left: 50px;
  }
}

/* Standard syntax */
@keyframes follow-animation {
  from {
    background: white;
    color: var(--orange);
    width: 85px;
    left: 50px;
  }
  to {
    background: var(--orange);
    border-color: var(--orange);
    color: #ffffff;
    width: 120px;
    left: 35px;
  }
}
@keyframes unfollow-animation {
  from {
    background: var(--orange);
    color: #ffffff;
    width: 120px;
    left: 35px;
  }
  to {
    background: white;
    border-color: var(--orange);
    color: var(--orange);
    width: 85px;
    left: 50px;
  }
}

input {
  -webkit-appearance: none;
}

input[type="checkbox"]:after {
  position: sticky;
  /*top: 50%;
  right: calc(50% - 7.5px); /* moitié de la largeur du checkbox 
  transform: translateY(-50%);*/
}

input:after {
  color: var(--orange);
  text-wrap: nowrap;
  font-size: 10pt;
  background-color: #ffffff;
  border: 1px solid;
  border-color: var(--orange);
  border-radius: 3px;
  position: absolute;
  top: 50px;
  left: 50px;
  cursor: hand;
  display: inline-block;
  text-align: center;
  padding: 5px 15px;

  content: "+ Follow";
  -webkit-animation: unfollow-animation 0.3s
    cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -webkit-animation-fill-mode: forwards;
  animation: unfollow-animation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-fill-mode: forwards;
}

input:checked:after {
  content: "Following";
  -webkit-animation: follow-animation 0.3s
    cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -webkit-animation-fill-mode: forwards;
  animation: follow-animation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-fill-mode: forwards;
}

@media screen and (max-width: 425px) {
  .tag-section {
    display: grid;
  }
}
</style>
