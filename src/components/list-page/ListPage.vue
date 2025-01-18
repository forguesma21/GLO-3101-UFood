<template>
  <div>
    <div class="list title-section">
      <p v-if="listData" class="list-name">{{ listData.name }}</p>

      <v-dialog v-model="dialog" max-width="400" persistent>
        <template
          v-slot:activator="{ props: activatorProps }"
          v-if="isUserConnected"
        >
          <i v-bind="activatorProps" class="bx bxs-edit"></i>
        </template>

        <v-card prepend-icon="mdi mdi-alert-circle" title="Edit name list">
          <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="newNameList"
                :rules="[required]"
                :readonly="loading"
                :counter="20"
                :placeholder="listData.name"
                required
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn @click="dialog = false"> Cancel </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="loading"
                  :disabled="newNameList === '' || loading"
                  @click="submitNewName"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-sheet>
        </v-card>
      </v-dialog>
    </div>

    <p v-if="listData && listData.restaurants < 1">Your list is empty</p>
    <div class="main-section" v-if="listData && listData.restaurants">
      <div v-for="restaurant in listData.restaurants" :key="restaurant.id">
        <ListCard
          :restaurantId="restaurant.id"
          :listId="listData.id"
          :isUserConnected="isUserConnected"
        />
      </div>
    </div>

    <div style="margin-top: 2rem; margin-bottom: 5rem">
      <p style="font-size: 1.5rem; font-weight: 550; margin-bottom: 30px">
        Add more restaurant's to this list
      </p>
      <v-sheet max-width="100%">
        <v-slide-group show-arrows>
          <template v-slot:next>
            <v-icon color="orange" large
              ><i class="bx bx-chevron-right" style="color: var(--orange)"></i
            ></v-icon>
          </template>
          <template v-slot:prev>
            <v-icon color="orange" large
              ><i class="bx bx-chevron-left" style="color: var(--orange)"></i
            ></v-icon>
          </template>

          <v-slide-group-item
            v-for="(restaurant, index) in availableRestaurants"
            :key="index"
          >
            <ModalAdd
              v-if="restaurantsData.length > 0"
              :restaurantsData="restaurantsData[index]"
              :listId="listData.id"
              :key="restaurantsData[index].id"
              @restaurant-added="removeRestaurantFromAvailable"
            />
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
      <router-link to="/">
        <p
          style="
            cursor: pointer;
            font-weight: 500;
            text-decoration: underline;
            margin-left: 3rem;
          "
        >
          See more
        </p></router-link
      >
    </div>
  </div>
</template>

<script setup>
import ListCard from "./ListCard.vue"
import { editList } from "@/services/favoriteAPI.js"
import { getRestaurants } from "@/services/restaurantAPI"
import { defineProps, onMounted, ref, computed } from "vue"
import Cookies from "js-cookie"
import ModalAdd from "./ModalAdd.vue"

const dialog = ref(false)
const loading = ref(false)
const newNameList = ref("")
const form = ref(null)
const isUserConnected = ref()
const restaurantsData = ref()

const props = defineProps({
  listData: {
    type: Object,
    required: true,
  },
  userId: {
    type: Object,
    required: true,
  },
})

const availableRestaurants = computed(() => {
  if (!restaurantsData.value || !props.listData.restaurants) {
    return []
  }
  const listIds = props.listData.restaurants.map((r) => r.id)
  return restaurantsData.value.filter(
    (restaurant) => !listIds.includes(restaurant.id)
  )
})

const onSubmit = () => {
  if (!form.value) return
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}

const required = (v) => {
  return !!v || "Field is required"
}

const submitNewName = async () => {
  const listId = props.listData.id
  const owner = props.listData.owner.email

  await editList(listId, newNameList.value, owner)
  dialog.value = false
}

const isCurrentUser = async () => {
  const connectedUserId = Cookies.get("userId")
  if (connectedUserId == props.userId && props.userId != null) {
    return true
  }
  return false
}

function removeRestaurantFromAvailable(restaurantId) {
  const index = restaurantsData.value.findIndex((r) => r.id === restaurantId)
  if (index !== -1) {
    restaurantsData.value.splice(index, 1)
  }
}

onMounted(async () => {
  restaurantsData.value = await getRestaurants()
  isUserConnected.value = await isCurrentUser()
})
</script>

<style scoped>
.list-name {
  font-size: var(--h1-font-size);
  font-weight: 600;
}
.list.title-section {
  display: flex;
  margin-left: 15px;
  align-items: center;
  gap: 1rem;
}
.bx.bxs-edit:hover {
  cursor: pointer;
}

.v-card-actions {
  justify-content: center;
}
</style>
